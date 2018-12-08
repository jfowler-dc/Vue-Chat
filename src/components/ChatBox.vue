<template>
	<div class="chatBox">
		<input type="text" v-bind:placeholder="placeholder" v-on:keyup.13="submitMessage" v-model="message">
		<button @click="submitMessage">Submit</button>
	</div>
</template>

<script>
// firebase
import firebase from 'firebase'

export default {
	name: 'chatBox',
	data () {
	    return {
			message: '',
			placeholder: 'Message'
	    }
	},
	methods: {
	    submitMessage () {
			firebase.database().ref('/messages').push({
				userEmail: firebase.auth().currentUser.email,
				userId: firebase.auth().currentUser.uid,
	            message: this.message,
	            submitTime: new Date().toUTCString(),
	            submitTimeEpoch: Date.now()
	        })
	        this.message = ''
	    }
	}
}
</script>

<style scoped>
	.chatBox {width:100%; text-align:center; display:flex; flex-wrap:nowrap; box-sizing:border-box; padding:10px; border-radius:10px; box-shadow:0px 3px 10px rgba(0,0,0,.2); background:#fff; margin:auto; margin-bottom:20px; }
	input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; border-right:0; border-top-right-radius:0; border-bottom-right-radius:0; box-sizing:border-box;}
	button {width:100%; cursor:pointer; max-width:100px; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; border-top-left-radius:0; border-bottom-left-radius:0; outline:0;}
	p {margin-top:20px; font-size:13px;}
	p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px;}
</style>


