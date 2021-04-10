import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";


import './App.css';

import { Layout, Menu } from 'antd';

import MySider from './components/Sider';

const { Header, Sider, Content } = Layout;


function App() {

  return (
    <Router>
      <MySider />
    </Router>
  );

}

export default App;
