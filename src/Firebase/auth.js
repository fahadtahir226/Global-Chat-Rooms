import firebase from "./firebase"
import { db } from './firestore';

export const auth = firebase.auth();

export const SignUpCall = (e, addError) => {
  e.preventDefault();

  var name = document.getElementById('reg-username').value;
  var email = document.getElementById("reg-email").value;
  var pass = document.getElementById("reg-pass").value;
  if (( name.length && email.length) !== 0  ) {
    auth.createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      auth.currentUser.updateProfile({displayName: name});
      // let uid = res.user.uid;

      // db.collection('users').doc(res.user.uid).set({name,email,uid, type: "Unassigned"})
      // .then(() => {
      //   console.log('User Added')
        window.location.replace('/dashboard/main');
      // })
    })
    .catch((err) => {
      console.log(err)
    })

  } 
  else {
    console.log('Every Field is Mandatory!')
  }
}

// User login 
export const SignInCall = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    auth.signInWithEmailAndPassword(email, pass)
    .then( res => {
      if (res) {
        window.location.replace("/dashboard/main");
        console.log(auth.currentUser);
      }
    }) 
    .catch((err) => {
      console.log('Every Field is Mandatory!', err)
    });

}

// User Sign Out
export const SignOut = () => {
    auth.signOut()
    .then(res => {
      window.location.replace("/");
    }).catch(err => {
        console.log(err);
    })
}
