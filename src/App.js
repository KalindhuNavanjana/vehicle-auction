import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./routes/Vehicles'));
const Vehicle = lazy(() => import('./routes/Vehicle'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle/:id" element={<Vehicle />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App;
