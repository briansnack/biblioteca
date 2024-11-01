import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookManagement from './pages/BookManagement';
import LoanManagement from './pages/LoanManagement';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookManagement />} />
            <Route path="/loans" element={<LoanManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;