// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
 // signInSuccessUrl: '/classes',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    
    
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
          type: 'image',
          size: 'invisible',
          badge: 'bottomleft'
      },

      defaultCountry: 'RU',
    //  defaultCountry: '+7',
    //  whitelistedCountries: ['RU','+7']
  },
    
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,


    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //  firebase.auth.PhoneAuthProvider.PROVIDER_ID,


  ],
};

function SignInScreen() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen