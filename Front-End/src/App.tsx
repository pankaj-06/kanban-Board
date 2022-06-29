import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import routes, { IRoutes } from './Routes';
import Footer from './Pages/Footer';
import Loader from './Components/loader/loader';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import TopBar from './Pages/Topbar';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { ToastProvider } from 'react-toast-notifications';



function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <TopBar />
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss placement='bottom-right' autoDismissTimeout={3000}>
        <App />
      </ToastProvider>
    </Provider>
  )
}

export default AppWrapper;
