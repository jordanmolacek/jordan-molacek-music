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

const SHOW_CSV_MAPPING = {
  '2026': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=482881023&single=true&output=csv',
  '2025': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=1148756601&single=true&output=csv',
  '2024': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=138002426&single=true&output=csv',
  '2023': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=563520846&single=true&output=csv',
  '2022': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=1805717559&single=true&output=csv',
  '2021': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzPetMTNzuoiQiuKnJ4m--r8OSUweUqGSGuMiy5brRShU0mA-il7Xqd1eVJGC4QVyBt1LaLjIK7-_O/pub?gid=0&single=true&output=csv'
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows csvMapping={SHOW_CSV_MAPPING} />} />
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
