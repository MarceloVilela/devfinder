import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppProvider from './hooks';
import Routes from './Routes'
import './App.css';

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
      <ToastContainer />
    </>
  );
}

export default App;
