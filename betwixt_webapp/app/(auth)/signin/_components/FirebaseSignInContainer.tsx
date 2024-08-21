"use client"
import { auth } from '@/firebase';
import firebase from 'firebase/compat/app';
import { StyledFirebaseAuth } from 'react-firebaseui';


const FirebaseSignInContainer = () => {
	const authConfig = {
		signInFlow: 'popup',
        signInSuccessUrl: '/menu',
        signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
	};
	
	return <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
}

export default FirebaseSignInContainer;