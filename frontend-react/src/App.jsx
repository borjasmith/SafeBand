import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LogsView from './views/LogsView';
import ScanView from './views/ScanView';
import logo from './assets/imgs/logo.jpg';
import './assets/styles/index.css';

const App = () => (
  <Router>
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="nav">
          <Link to="/scan">Scan</Link>
          <Link to="/logs">Logs</Link>
        </nav>
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<ScanView />} />
          <Route path="/scan" element={<ScanView />} />
          <Route path="/logs" element={<LogsView />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
