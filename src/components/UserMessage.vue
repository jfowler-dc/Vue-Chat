<template>
	<div v-if="userId == currentUser" class="message active">
		<div class="userMessage">
			<div class="tools">
				<div @click="deleteMessage" class="circle">
					<i class="far fa-trash-alt"></i>
				</div>
				<div @click="editMessage" class="circle">
					<i class="far fa-edit"></i>
				</div>
			</div>
			<p>
				<span v-if="updateMessage == true"><input v-model="message" type="text" v-on:keyup.13="editMessage"></span>
				<span class="messageContent" v-else>{{this.message}}</span>
				<br>
				<span>{{this.user.split('@')[0]}}</span>
			</p>
		</div>
		<div class="image"></div>
	</div>

	<div v-else class="message">
		<div class="image"></div>
		<div class="userMessage">
			<div class="tools">
				<div @click="likeMessage" class="circle">
					<i class="far fa-thumbs-up"></i>
				</div>
				<div class="likes circle">
					
				</div>
			</div>
			<p>
				{{this.message}} <br>
				<span>{{this.user.split('@')[0]}}</span>
			</p>
		</div>
	</div>
	
</template>

<script>
// firebase
import firebase from 'firebase'

export default {
	name: 'userMessage',
	props: ['message', 'user', 'userId', 'id'],
	data () {
		return {
			currentUser: firebase.auth().currentUser.uid,
			updateMessage: false
		}
	},
	methods: {
		deleteMessage () {
			firebase.database().ref('messages').child(this.id).remove()
		},
		editMessage () {
			if (this.updateMessage == false) {
				this.updateMessage = true
			} else {
				this.updateMessage = false
				firebase.database().ref('messages').child(this.id).update({
					message: this.message
				})
			}
		},
		likeMessage () {
			firebase.database().ref('messages').child(this.id).child('likes').push({
				userId: this.userId
			})
		}
	}
}
</script>

<style scoped>
	.image {width:30px; height:30px; background:#42b983; border-radius:30px; margin-right:10px; margin-top:auto;}
	.message {width:100%; margin-bottom:10px; display:flex; justify-content: flex-start;}
	.message.active {justify-content: flex-end;}
	.message.active .image {margin-right:0; margin-left:10px;}
	.message.active .userMessage {background:#42b983; border:0; color:#fff;}
	.tools {position:absolute; top:-10px; width:100%; display:none; align-items:center; flex-wrap:nowrap;}
	.tools .circle {margin-right:5px; min-width:20px; min-height:20px; border-radius:20px; box-sizing:border-box; border:1px solid #e7e7e7; background:#fff; display:flex; align-items:center; justify-content:center;}
	.tools .circle .far {font-size:10px;}
	.tools .circle.likes {margin-left:auto; margin-right:20px;}
	.message.active .tools .circle {background:#42b983; border:0;}
	.userMessage {max-width:75%; position:relative; text-align:center; box-sizing:border-box; padding:10px; border-radius:10px; border:1px solid #e7e7e7; background:#fff;}
	.userMessage:hover .tools {display:flex;}
	.message:last-child {margin-bottom:0;}
	input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; margin-bottom:10px; box-sizing:border-box;}
	button {margin-top:10px; width:100%; cursor:pointer; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; outline:0;}
	p, .messageContent {font-size:16px; margin:0; text-align:left;}
	p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px;}
	p span {font-size:10px;}
</style>


