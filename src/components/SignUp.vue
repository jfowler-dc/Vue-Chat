<template>
  <div>
    <div class="sign-up">
      <h3>Sign Up</h3>
      <p>Let's create a new account!</p>
      <input type="email" v-model="email" placeholder="Email" v-on:keyup.13="signUp"><br>
      <input type="password" v-model="password" placeholder="Password" v-on:keyup.13="signUp"><br>
      <input type="text" v-model="name" placeholder="Name">
      <button @click="signUp">Sign Up</button>
      <p>or go back to <router-link to="/login">login</router-link>.</p>
    </div>
    <div id="notifications"></div>
  </div>
</template>

<script>
// firebase
import firebase from 'firebase'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('chatroom')
          firebase.database().ref('/users').child(user.user.uid).set({
            email: user.user.email,
            loginTime: new Date().toUTCString(),
            loginTimeEpoch: Date.now(),
            name: this.name,
            loggedIn: true
          })

        },
        (err) => {
          //alert('Oops. ' + err.message)
          this.alertMessage('Oops! ' + err.message, 'error')
        }
      )
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
  }
}
</script>

<style scoped>
  .sign-up {width:300px; text-align:center; box-sizing:border-box; padding:30px; border-radius:10px; box-shadow:0px 3px 10px rgba(0,0,0,.2); background:#fff; margin:auto; margin-top:40px;}
  input {width:100%; padding:10px 15px; outline:0; border-radius:20px; border:1px solid #e7e7e7; margin-bottom:10px; box-sizing:border-box;}
  button {margin-top:10px; width:100%; cursor:pointer; padding:10px 20px; background:#42b983; color:#fff; font-weight:bold; border:none; border-radius:20px; outline:0;}
  p {margin-top:20px; font-size:13px;}
  p a {transition:.2s ease;}
  p a:hover {cursor:pointer; background:#42b983; color:#fff; text-decoration:none; padding:0 5px; transition:.2s ease;}
</style>
