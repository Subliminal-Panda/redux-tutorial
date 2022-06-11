import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Links } from './components/header/header';
import { Page } from './components/page/page';

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
