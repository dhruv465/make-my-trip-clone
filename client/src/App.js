import React from 'react';
import Home from './pages/Home';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';




function App() {
  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <Home />
    </>
  );
}

export default App;