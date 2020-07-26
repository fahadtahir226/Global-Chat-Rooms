import firebase from "firebase"
import { auth } from './auth'
// import { db } from './firestore';

export const facebookLogin = (event) => {
  event.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // var secret = result.credential.secret;
    // The signed-in user info.
    // var user = result.user;
    // ...
    // console.log(token, secret, user);
    auth.currentUser.updateProfile({displayName: result.user.name});
    window.location.replace('/dashboard/main');
    // window.location.replace('../home.html');
  })
  .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode, errorMessage,email, credential);
      // ...
  });
}