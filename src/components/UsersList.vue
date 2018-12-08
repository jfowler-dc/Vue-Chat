<template>
	<div class="userContainer">
		<div class="image"></div>
		<div class="user">
			<p>
				{{this.user.split('@')[0]}}
			</p>
		</div>
	</div>
</template>

<script>
// firebase
import firebase from 'firebase'

export default {
	name: 'userList',
	props: ['user'],
	data () {
	    return {
	    	userName: this.user.split('@')[0]
	    }
	},
	created () {

	}
}
</script>

<style scoped>
	.userContainer {display:flex; align-items:center; margin-bottom:10px; }
	.image {width:30px; min-width:30px; height:30px; margin-right:10px; border-radius:30px; background:#42b983;}
	.user {width:100%; text-align:center; box-sizing:border-box; padding:10px; border-radius:10px; border:1px solid #e7e7e7; background:#fff; margin:auto; margin-bottom:5px;}
	.user:last-child {margin-bottom:0;}
	input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; margin-bottom:10px; box-sizing:border-box;}
	button {margin-top:10px; width:100%; cursor:pointer; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; outline:0;}
	p {font-size:13px; margin:0; text-align:left;}
	p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px;}
	p span {font-size:10px;}
</style>