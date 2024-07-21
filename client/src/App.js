import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import UnauthorizedAccess from './actions/UnauthorizedAccess'; // Import unauthorized access component
import './App.css';
import Dashboard from './pages/Dashboard';
import SearchResult from './pages/FlightDetails';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<UnauthorizedAccess />} /> {/* Catch-all route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
