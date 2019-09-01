<template>
    <div class="container chat">
        <h2 class="text-primary text-center"> Real Time Chat </h2>
        <h5 class="text-secondary text-center"> Vue jS & Firebase </h5>
        <div class="card">
            <div class="card-body">
                <p class="text-secondary no-messages" v-if="message.length == 0">
                    [No Messages Yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="message in messages" :key="message.id">
                        <span class="text-info">[{{ message.name }}] </span>
                        <span> {{ message.message }}</span>
                        <span class="text-secondary time">{{ message.timestamp }}</span>
                    </div>
                </div>
                <div class="card-action">
                    <CreateMessage :name="name"></CreateMessage>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage';
import FB from '@/firebase/init';
import Moment from 'moment';

export default {
    name: 'Chat',
    props: ['name'],
    components: { CreateMessage },
    data() {
        return {
            message: []
        }
    },
    created() {
        let ref = FB.collection('messages').orderBy('timestamp');
        ref.onSnapshort(snapshort => {
            snapshort.docChanges().forEach(change => {
                if(change.type = 'added') {
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    })
                }
            })
        })
    }
}
</script>

<style>
    .chat h2 {
        font-size: 2.6em;
        margin-bottom: 0px;
    }

    .chat h5 {
        margin-top : 0px;
        margin-bottom: 40px;
    }

    .chat span {
        font-size: 1.2em;
    }

    .chat .time {
        display: block;
        font-size: 0.7em;
    }

    .messages {
        max-height: 300px;
        overflow: auto;
    }
</style>