import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';

import MySider from './components/Sider';

function App() {

  return (
    <Router>
      <MySider />
    </Router>
  );

}

export default App;
