import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Links } from './components/header/header';
import { Page } from './components/page/page';
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

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

function App() {
  return (
  <>
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
  </>
  );
}

export default App;
