<template>
	<div class="messageList">
		<userMessage v-for="(m, key) in messages[messages.length - 1]" :message="m.message" :user="m.userEmail" :userId="m.userId" :name="m.name" :likes="m.likes" :id="key" />
	</div>
</template>

<script>
// firebase
import firebase from 'firebase'

// components
import userMessage from './UserMessage'

export default {
	name: 'messageList',
	data () {
	    return {
	    	messages: [],
	    	user: firebase.auth().currentUser.uid
	    }
	},
	methods: {
	    scrollToBottom () {   	
      		var elem = this.$el;
			elem.scrollTop = elem.scrollHeight
	    },
	},
	created () {
		firebase.database().ref('messages').limitToLast(100).on('value', snap => {
			this.messages.push(snap.val());
		})
	},
	components: {
		userMessage
	},
	mounted() {
		this.scrollToBottom()
	},
	updated () {
		this.scrollToBottom()
	}
}
</script>

<style scoped>
	.messageList {text-align:center; max-height:calc(100vh - 175px); overflow-y:scroll; box-sizing:border-box; padding:10px; border-radius:10px; box-shadow:0px 3px 10px rgba(0,0,0,.2); background:#fff; margin:auto; margin-top:20px; margin-bottom:20px; }
	input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; margin-bottom:10px; box-sizing:border-box;}
	button {margin-top:10px; width:100%; cursor:pointer; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; outline:0;}
	p {margin-top:20px; font-size:13px;}
	p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px;}
</style>


