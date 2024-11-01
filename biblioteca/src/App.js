import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookManagement from './pages/BookManagement';
import UserManagement from './pages/UserManagement';
import LoanManagement from './pages/LoanManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BookManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/loans" element={<LoanManagement />} />
      </Routes>
    </Router>
  );
}

export default App;