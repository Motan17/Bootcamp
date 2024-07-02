import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Content from './Contentt';
import Isi from './jam';
import Sidebar from './sidebar';
import YT from './yt';

function App() {
  return (
    <Router>
      <div className="container">
       
        <Content />
      
        <Sidebar/>
        <Routes>
        <Route path="/" element={<Isi />} />
          <Route path="/yt" element={<YT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
