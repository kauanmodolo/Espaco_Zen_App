// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9JUfHaNcm4cg9aN_OS0eGDUk4Tvk_cuo",
    authDomain: "espaco-zen-7a79e.firebaseapp.com",
    projectId: "espaco-zen-7a79e",
    storageBucket: "espaco-zen-7a79e.appspot.com",
    messagingSenderId: "215848612648",
    appId: "1:215848612648:web:22356d16386ac5e24a961d"
  };

// Verifique se o Firebase já foi inicializado
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
