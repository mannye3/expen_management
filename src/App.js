import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div>
        <Router>
          <Route exact path='/logn' component={Login} />
          <Route exact path='/' component={Home} /> 
        </Router>
    </div>
    
  )
}

export default App;
