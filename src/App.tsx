import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Page from './components/page/page';
import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, DocumentData } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Import the functions you need from the SDKs you need
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

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

const email = 'tmouritsen57@gmail.com'
const password = 'DummyPassword57'

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user)
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
  order: number,
  title: string,
  route: string
}

export default function App() {
  const [pages, setPages] = useState<DocumentData[]>([{
    order: 0,
    id: 1,
    title: "Home / Bio",
    route: "home"
  }] as PageType[])
  const [sortedPages, setSortedPages] = useState<PageType[]>([{
    order: 0,
    id: 1,
    title: "Home / Bio",
    route: "home"
  }])
  async function getPages(db: Firestore) {
    const pagesCollection = collection(db, 'pages');
    const pagesSnapShot = await getDocs(pagesCollection);
    const pageArray: PageType[] = []
    pagesSnapShot.docs.forEach(doc => {
      const docData = doc.data()
      const data = {
        id: docData.id,
        order: docData.order,
        title: docData.title,
        route: docData.route,
        docID: doc.id,
      }
      pageArray.push(data)
    })
    return pageArray;
  }
  useEffect(() => {
    getPages(db).then(response => {
      response.forEach(page => {
        if (!pages.includes(page)) {
          setPages(prevPages => [...prevPages, page])
        }
      })
      console.log("pages response:", response)
    })
  }, [])
  useEffect (() => {
    setSortedPages(pages.sort((a, b) => a.order - b.order) as PageType[]);
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
