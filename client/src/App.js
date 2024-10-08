import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage.tsx';

function App() {
  return (
    <div className="h-screen w-full bg-gray-100 ">
      <Router>
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/welcome/:id" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
