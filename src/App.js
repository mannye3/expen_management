import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

import Footer from './components/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div>
        <Router>

        <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} /> 
          <Footer/>
         
         
          

       
        
        

        </Router>
    </div>
    
  )
}

export default App;
