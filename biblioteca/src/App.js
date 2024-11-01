import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import BookManagement from './pages/BookManagment';
import LoanManagement from './pages/LoanManagment';
import UserManagement from './pages/UserManagment';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BookManagement />} />
          <Route path="/loans" element={<LoanManagement />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;