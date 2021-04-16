import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD23uugYt-TMgI99vKm6PpDl_GR9z0YAFw",
    authDomain: "whatsapp2-5e316.firebaseapp.com",
    projectId: "whatsapp2-5e316",
    storageBucket: "whatsapp2-5e316.appspot.com",
    messagingSenderId: "365298701385",
    appId: "1:365298701385:web:db030d35341598e5d65b98"
};

const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };