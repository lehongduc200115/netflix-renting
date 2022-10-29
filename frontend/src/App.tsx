import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
           <Routes>
                 {/* <Route exact path='/' element={< Home />}></Route> */}
                 <Route path='/login' element={< Login />}></Route>
                 {/* <Route exact path='/contact' element={< Contact />}></Route> */}
          </Routes>
          </div>
       </Router>
   );
  }
}
  
export default App;
