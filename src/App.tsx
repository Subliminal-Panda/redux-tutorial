import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { Links } from './components/header/header';
import { Page } from './components/page/page';
import { FirebaseApp } from 'firebase/app';
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD3Y6vVk1dfnGARricg_-J9HtMQutKMMok",

  authDomain: "portfolio-ed54d.firebaseapp.com",

  projectId: "portfolio-ed54d",

  storageBucket: "portfolio-ed54d.appspot.com",

  messagingSenderId: "816685952890",

  appId: "1:816685952890:web:75ded5c7632676c86870c3",

  measurementId: "G-HEDGT9JQ5G"

};


// Initialize Firebase

const app: FirebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// document.addEventListener('DOMContentLoaded', function() {
//   const loadEl = document.querySelector('#load');
//   const scriptsArray = ["/__/firebase/9.8.3/firebase-app-compat.js", "/__/firebase/9.8.3/firebase-auth-compat.js", "/__/firebase/9.8.3/firebase-database-compat.js", "/__/firebase/9.8.3/firebase-firestore-compat.js", "/__/firebase/9.8.3/firebase-functions-compat.js", "/__/firebase/9.8.3/firebase-messaging-compat.js", "/__/firebase/9.8.3/firebase-storage-compat.js", "/__/firebase/9.8.3/firebase-analytics-compat.js", "/__/firebase/9.8.3/firebase-remote-config-compat.js", "/__/firebase/9.8.3/firebase-performance-compat.js", "/__/firebase/init.js?useEmulator=true"]
//   let tempEl = document.createElement('div')
//   tempEl.innerHTML = ''
//   let scripts = tempEl.getElementsByTagName('script')

//   for (let i = 0; i < scriptsArray.length; i++) {
//     let script = document.createElement('script');
//     script.type='text/javascript';
//     if(scriptsArray[i]) {
//       script.src = scriptsArray[i];
//     }
//     else {
//         script.innerHTML = scriptsArray[i]
//         eval(scripts[i].innerHTML)
//     } 
//     document.getElementsByTagName("head")[0].appendChild(script);
//   }
// });

function App() {
  return (
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page pageName="Home" />} />
          {Links && Links.map(link => {
            return(
              <Route path={"/" + link} element={<Page pageName={link} />}/>
              )
            })}
        </Routes>
      </BrowserRouter>
    </Provider>
    <div id="load" />
  </>
  );
}

export default App;
