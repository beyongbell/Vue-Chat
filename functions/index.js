const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onMessageCreate = functions.firestore
 .document('messages/{userId}')
 .onCreate((snap, context) => {
     const ref = admin.firestore().collection('messages').orderBy('timestamp')
     ref.onSnapshot(snapshort => {
         i = 0,
         size = snapshort.size,
         sizeToDelete = size - 10,
         console.log('Message Count: '+size);
         snapshort.forEach((doc) => {
             if(i < sizeToDelete) {
                 doc.ref.delete().then(() => {
                     console.log("Document deleted Successfully")
                 }).catch((error) => {
                    console.log("Error Removing document :"+error)
                 })
             }
             i++;
         })
     })
 })