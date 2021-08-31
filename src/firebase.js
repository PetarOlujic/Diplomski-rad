import firebase from 'firebase/app'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
	apiKey: 'AIzaSyA0L8nubumRSse71x-ddiXUq2fC1-fZpfQ',
	authDomain: 'collaborative-app-login-page.firebaseapp.com',
	projectId: 'collaborative-app-login-page',
	storageBucket: 'collaborative-app-login-page.appspot.com',
	messagingSenderId: '722107303279',
	appId: '1:722107303279:web:34090eb655f6201934549a',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const authUI = new firebaseui.auth.AuthUI(auth)

export default firebase
