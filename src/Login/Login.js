import React, { useState } from 'react';
import './Login.css';
// import FormControl from '@material-ui/core/FormControl';
 
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';
// import { Input} from '@material-ui/icons';

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}  
const Login = () => {

    const [user, setUser] = useState({});


const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
      console.log("google icon clicked");
      firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
     
    var credential = result.credential;
 
    var token = credential.accessToken;
  
      var user = result.user;
      console.log(user);
      setUser(user);
  
  }).catch((error) => {
   
    var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
 
    var email = error.email;
     
    var credential = error.credential;
   
  });
  }

const facebookSignIn = () => {
          var provider = new firebase.auth.FacebookAuthProvider();
        firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
      var user = result.user;
      console.log(user);
       setUser(user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorMessage);
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
}
const githubSignIn=()=>{
var provider = new firebase.auth.GithubAuthProvider();
firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
      console.log(user);
       setUser(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
      var errorMessage = error.message;
        console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}
  let isValid;
  const handleChange = (e) => {  
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const passRegex = /^[A-Za-z0-9]\w{5,10}$/;

     isValid=emailRegex.test(e.target.value)
    //  isValid=passRegex .test(e.target.value)

     console.log(e.target.name, isValid);
}
  const handleSubmit = (e) => {
   
}

    return (
        <>     
        <div className="form-login">
        <form>
            <input type="text" placeholder="Your Name" name="name" onChange={ handleChange}/>
            <br/>
            <input type="email" placeholder="Your Email" name="email" onChange={ handleChange} required/>
            <br/>
            <input type="password" placeholder="Your Password" name="password" onChange={ handleChange} required/>
            <br/>
            <button type="submit">Sign Up</button>
        </form>
          </div>

         <div className="social-login">
                 <h5>Or log in with social account</h5>
                  <div className="social-icons">              
                    <div className="icon" onClick={facebookSignIn}>
                         <img src="https://img.icons8.com/cute-clipart/64/000000/facebook-new.png" alt="icon"/>
                     {/* <small> Facebook</small> */}
                    </div>
                 
                    <div className="icon" onClick={handleGoogleSignIn}>
                          <img src="https://img.icons8.com/cute-clipart/128/000000/google-logo.png" alt="icon"/>
                       {/* <small> Google</small> */}
                    </div>
                    <div className="icon" onClick={githubSignIn}>
                        <img src="https://img.icons8.com/cute-clipart/64/000000/github.png" alt="icon"/>
                        {/* <small>Github</small> */}
                    </div>
               </div>
            </div>
            {/* user info state */}
            <div className="user-info">
                <h1>Welcome to our website {user.displayName}</h1>
                <h3>Name : {user.displayName}</h3>
                <h4>Email : { user.email}</h4>
                <img src={user.photoURL} alt="userProfile"/>
            </div>
        </>
    );
};

export default Login;