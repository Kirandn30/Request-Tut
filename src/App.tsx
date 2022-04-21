import React from 'react';
import './App.css';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Dashboard } from './components/content/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userauth from './context/UserauthContext';
import { Protected } from './components/protectedRoute';

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Userauth>
          <Routes>
            <Route index element={<Protected><Dashboard /></Protected>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Userauth>
      </BrowserRouter >
    </div>
  )
}

export default App;
