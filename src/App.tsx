import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shows from './pages/Shows';
import About from './pages/About';
import Media from './pages/Media';
import Contact from './pages/Contact';
import './App.css';

// Replace these with actual published CSV URLs from the different year tabs
const SHOW_CSV_URLS = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-placeholder-2024/pub?output=csv',
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-placeholder-2023/pub?output=csv',
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-placeholder-2022/pub?output=csv',
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-placeholder-2021/pub?output=csv'
];

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows csvUrls={SHOW_CSV_URLS} />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
