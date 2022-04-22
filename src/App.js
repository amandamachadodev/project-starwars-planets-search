import React from 'react';
import './App.css';
import Home from './Pages/Home';
import StarProvider from './Context/StarProvider';

function App() {
  return (
    <StarProvider>
      <Home />
    </StarProvider>
  );
}

export default App;
