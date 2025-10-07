import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Gallery from './pages/Gallery';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router basename="/CS409_MP2">
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
