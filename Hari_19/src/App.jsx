// src/App.jsx
import React from 'react';
import store from './app/store';
import Header from './head';
import Redus from './redux';
import Simple from './form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <Router>
    <div className="container">
     
     
    
      <Header/>
      <Routes>
      <Route path="/" element={<Redus />} />
        <Route path="/form" element={<Simple />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
