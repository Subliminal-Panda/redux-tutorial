import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Page from './components/page/page';
import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, Firestore, DocumentData, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/firestore";
import { Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsO-E829V6dg-zpLaIMVh9vqW8ROTK8ro",
  authDomain: "nature-portfolio-3b346.firebaseapp.com",
  databaseURL: "https://nature-portfolio-3b346-default-rtdb.firebaseio.com",
  projectId: "nature-portfolio-3b346",
  storageBucket: "nature-portfolio-3b346.appspot.com",
  messagingSenderId: "147305952973",
  appId: "1:147305952973:web:6d68373cc46cc2f9059b84",
  measurementId: "G-4232TZN14H"
};

// Initialize Firebase

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(firebaseApp);
export const auth: Auth = getAuth(firebaseApp);
export const analytics: Analytics = getAnalytics(firebaseApp);

// const email = 'tmouritsen57@gmail.com'
// const password = 'DummyPassword57'

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("error:", errorCode, errorMessage)
//     // ..
//   });

export interface PageType {
  docId?: string,
  id: number,
  title: string,
  route: string
}

export default function App() {
  const [pages, setPages] = useState<PageType[]>([{
    id: 1,
    title: "Home/Bio",
    route: "home"
  }])
  const [sortedPages, setSortedPages] = useState<PageType[]>([{
    id: 1,
    title: "Home/Bio",
    route: "home"
  }])
  async function getPages(db: Firestore) {
    const pagesCollection = collection(db, 'pages');
    const pagesSnapShot = await getDocs(pagesCollection);
    const pageArray: PageType[] = []
    pagesSnapShot.docs.forEach(doc => {
      const data = doc.data()
      const ref = doc.ref
      const pageData: PageType = {
        id: data.id,
        title: data.title,
        route: data.route,
        docId: doc.id,
      }
      if (pageData.id && pageData.route && pageData.title && !data.docId) {
        setDoc(ref, pageData)
      }
      pageArray.push(pageData)
    })
    return pageArray;
  }

  // Make the page order (and page item order) tracked in an array of ids, so the order can change without changing the db doc!

  // creating a new page doc:
  // useEffect(() => {
  //   const newDocRef = doc(collection(db, 'pages'))
  //   const docData = {
  //     id: 57,
  //     title: 'Fake Made Up Page',
  //     route: 'fake',
  //     docId: newDocRef.id
  //   };
  //   setDoc(doc(db, 'pages', newDocRef.id), docData);
  // }, []);

  // deleting a doc:
  // const newDocRef = doc(collection(db, 'pages'))
  // deleteDoc(ref)

  useEffect(() => {
    getPages(db).then(response => {
      response.forEach(page => {
        if (!pages.includes(page)) {
          setPages(prevPages => [...prevPages, page])
        }
      })
    })
  }, [])

  useEffect (() => {
    setSortedPages(pages.sort((a, b) => a.id - b.id) as PageType[]);
  }, [pages])
  
  return (
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Page page={sortedPages[0]} pages={sortedPages} />}/>
          {sortedPages && sortedPages.map(page => {
            if (typeof page.route === "string" && typeof page.title === "string") {
              return(
                <Route path={"/" + page.route} element={<Page page={page} pages={sortedPages} />}/>
                )
              }
            })}
        </Routes>
      </BrowserRouter>
    </Provider>
    <div id="load" />
  </>
  );
}
