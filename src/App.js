import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateToken from './components/CreateToken';
import GenerateEmail from './components/GenerateEmail';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateToken />} />
        <Route path="/email" element={<GenerateEmail />} />
      </Routes>
    </div>
  );
}

export default App;
