import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import routes, { IRoutes } from './Routes';
import Footer from './Pages/Footer';
import Loader from './Components/loader/loader';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import ResponsiveAppBar from './Pages/Topbar';




function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <ResponsiveAppBar />
        <main className='main'>
          <React.Suspense fallback={<Loader />}>
            <Routes>
              {
                routes.map((obj: IRoutes, idx: number) => {
                  return <Route
                    key={idx}
                    path={obj.path}
                    element={obj.element}
                  />
                })
              }
            </Routes>
          </React.Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
