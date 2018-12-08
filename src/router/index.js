import Vue from 'vue'
import Router from 'vue-router'

// components
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ChatBox from '@/components/ChatBox'

// firebase
import firebase from 'firebase'

Vue.use(Router)

// routes
let router = new Router({
  routes: [
  	{
		path: '*',
		redirect: '/login' 
    },
    {
		path: '/',
		redirect: '/login' 
    }, 
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
    	path: '/sign-up',
    	name: 'SignUp',
    	component: SignUp
    },
    {
		path: '/chatroom',
		name: 'HelloWorld',
		component: HelloWorld,
		meta: {
			requiresAuth: true
		}
    },
    {
        path: '/chat-box',
        name: 'ChatBox',
        component: ChatBox,
        meta: {
            requiresAuth: true
        }
    }
  ]
})

// Auth Guard
router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next('login')
	else if (!requiresAuth && currentUser) next('chatroom')
	else next() 
})


export default router