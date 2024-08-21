import { handleLogout } from "@/app/_actions/user.actions";
import { auth } from "@/firebase"
import { getRedirectResult, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth"

type callback = (props?: any) => void;

type SignInWithEmailProps = {
    email: string,
    password: string
}

export const betwixtSignInWithEmail = (props: SignInWithEmailProps, callback?: callback) => {
    signInWithEmailAndPassword(auth, props.email, props.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("[SignIn] Email Sign In ", user);
                callback && callback();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
}

export const betwixtSignInWithProvider = (provider: any) => signInWithRedirect(auth, provider);

export const betwixtRedirect = (provider: any, callback?: callback) => {
    getRedirectResult(auth)
            .then(async(result) => {
                console.log('[ProviderRedirect] : ', result);
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential =
                    result && provider.credentialFromResult(result);
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result?.user;
                if (!user || !result)
                    return;
                
                callback && callback(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const credential = provider.credentialFromError(error);
                // ...
            });
}

export const betwixtSignOut = (callback?: callback) => {
    signOut(auth).then(() => {
        console.log('[Signed Out] User signed out');
        localStorage.clear();
        handleLogout();
        callback && callback();
    }).catch(err => {
        console.log('[Error] : ', err.message);
    })
}