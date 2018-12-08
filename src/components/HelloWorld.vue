<template>
  <div class="chatRoom">
    <div class="topBar">
      <h3>{{this.currentUser}}</h3>
      <button @click="logout">Logout</button>
    </div>
    <div class="bottom">
      <div class="userWindow">
        <h4>Logged In Users</h4>
        <userList v-if="u.loggedIn == true" v-for="(u, key) in users[users.length - 1]" :user="u.email" />
        <h4>Logged Out Users</h4>
        <userList v-if="u.loggedIn != true" v-for="(u, key) in users[users.length - 1]" :user="u.email" />
      </div>
      <div class="chatWindow">
        <messageList/>
        <chatBox/>
      </div>
    </div>
  </div>
</template>

<script>
// firebase
import firebase from 'firebase'

// components
import messageList from './MessageList'
import chatBox from './ChatBox'
import userList from './UsersList'

export default {
  name: 'HelloWorld',
  data () {
    return {
      users: [],
      currentUser: firebase.auth().currentUser.email.split('@')[0]
    }
  },
  methods: {
    logout () {
      firebase.database().ref('/users').child(firebase.auth().currentUser.uid).update({
        loggedIn: false
      })
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  created() {
    firebase.database().ref('users').limitToLast(100).on('value', snap => {
      this.users.push(snap.val())
    })
  },
  components: {
    messageList,
    chatBox,
    userList
  }
}
</script>

<style scoped>
  .chatRoom {width:100%; height:100%; display:flex; flex-wrap:wrap;}
  .topBar {width:100%; height:60px; background:#42b983; display:flex; align-items:center;}
  .topBar h3 {color:#fff; margin-right:auto; margin-left:20px;}
  .bottom {display:flex; flex-wrap:nowrap; height:100%; width:100%;}
  .userWindow {width:300px; min-width:200px; box-sizing:border-box; padding:10px; margin:20px; margin-right:0; height:calc(100% - 40px); border-radius:10px; background:#fff; box-shadow:0px 3px 10px rgba(0,0,0,.2); overflow:scroll;}
  .chatWindow {width:100%; box-sizing:border-box; padding:0 20px;}

  .chatroom {text-align:center; width:100%; margin:auto;}
  h1, h2 {font-weight:normal;}
  ul {list-style-type:none; padding:0;}
  li {display:inline-block; margin:0 10px;}
  a {color:#42b983;}
  button {padding:10px 20px; background:#fff; margin-right:20px; color:#42b983; font-weight:bold; border:none; border-radius:20px; outline:0; cursor:pointer;}
</style>
