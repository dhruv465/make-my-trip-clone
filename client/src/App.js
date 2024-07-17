import React from 'react';
import Home from './pages/Home';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import SearchResult from './pages/FlightDetails';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>   
    </>
  );
}

export default App;