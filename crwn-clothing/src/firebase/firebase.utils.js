import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyCeeJxORqeYBo1d8HqgCNV_GbKafqXtpj4',
    authDomain: 'crwn-db-f353b.firebaseapp.com',
    databaseURL: 'https://crwn-db-f353b.firebaseio.com',
    projectId: 'crwn-db-f353b',
    storageBucket: 'crwn-db-f353b.appspot.com',
    messagingSenderId: '1058643821257',
    appId: '1:1058643821257:web:193f8efb5150d2ed570318',
    measurementId: 'G-01CFTJDDPK',
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // If the user does not exist, create new user
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
