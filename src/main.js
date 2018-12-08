// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;

let config = {
    apiKey: 'AIzaSyA-xIAg8H0qfEKrt-vQwy4Cpq-hwW11qRg',
    authDomain: 'vue-firebase-auth-80c07.firebaseapp.com',
    databaseURL: 'https://vue-firebase-auth-80c07.firebaseio.com',
    projectId: 'vue-firebase-auth-80c07',
    storageBucket: 'vue-firebase-auth-80c07.appspot.com',
    messagingSenderId: '245439234154'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			components: { App },
			template: '<App/>'
		})
	}
});
