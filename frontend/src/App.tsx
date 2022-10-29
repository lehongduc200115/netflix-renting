import React, { Component } from 'react';
import './App.css';
import Login from './login/Login'
import Pricing from './pricing/Pricing'
import Checkout from './checkout/Checkout'
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
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/checkout">Contact Us</Link>
              </li>
            </ul>
           <Routes>
                 {/* <Route exact path='/' element={< Home />}></Route> */}
                 <Route path='/login' element={< Login />}></Route>
                 <Route path='/pricing' element={< Pricing />}></Route>
                 <Route path='/checkout' element={< Checkout />}></Route>
          </Routes>
          </div>
       </Router>
   );
  }
}
  
export default App;
