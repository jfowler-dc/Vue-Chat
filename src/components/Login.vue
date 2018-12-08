<template>
  <div>
    <div class="login">
      <h3>Sign In</h3>
      <input type="email" v-model="email" placeholder="Email" v-on:keyup.13="signIn"><br>
      <input type="password" v-model="password" placeholder="Password" v-on:keyup.13="signIn"><br>
      <button @click="signIn">Connect</button>
      <p>You don't have an account? <br> You can <router-link to="/sign-up">create one</router-link>!</p>
    </div>
    <div id="notifications"></div>
  </div>
</template>

<script>
// firebase
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('chatroom')
          firebase.database().ref('/users').child(user.user.uid).update({
            email: user.user.email,
            loginTime: new Date().toUTCString(),
            loginTimeEpoch: Date.now(),
            loggedIn: true
          })
          localStorage.setItem('email', this.email)
          localStorage.setItem('password', this.password)
        },
        (err) => {
          //alert('Oops. ' + err.message)
          this.alertMessage('Oops! ' + err.message, 'error')
        }
      );
    },
    alertMessage(message, type) {
      var element = document.createElement('div');
      var messageElement = document.createElement('div');
      element.classList.add('notificationSlider');
      element.appendChild(messageElement);
      setTimeout(function(){
          element.classList.add(type);
      }, 100);
      messageElement.innerHTML = message;
      document.querySelector('#notifications').appendChild(element);
      setTimeout(function () {
          element.classList.remove(type);
          setTimeout(function () {
              element.remove();
          }, 300);
      }, 5000);
    }
  },
  created () {
    if (localStorage.getItem('email') != '' && localStorage.getItem('password') != '') {
      this.email = localStorage.getItem('email')
      this.password = localStorage.getItem('password')
    }
  }
}
</script>

<style scoped>
  .login {width:300px; text-align:center; box-sizing:border-box; padding:30px; border-radius:10px; box-shadow:0px 3px 10px rgba(0,0,0,.2); background:#fff; margin:auto; margin-top:40px;}
  input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; margin-bottom:10px; box-sizing:border-box;}
  button {margin-top:10px; width:100%; cursor:pointer; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; outline:0;}
  p {margin-top:20px; font-size:13px;}
  p a {transition:.2s ease;}
  p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px; transition:.2s ease;}
</style>
