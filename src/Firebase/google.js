import firebase from "firebase"
import { auth } from './auth'
// import { db } from './firestore';

export const googleLogin = (event) => {
  event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(function (result) {
      auth.currentUser.updateProfile({displayName: result.user.name});
      console.log(result.user.uid)
      window.location.replace('/dashboard/chatRoom1');
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(errorCode, errorMessage);
        // ...
    });
}