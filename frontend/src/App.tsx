import React, { Component, useContext, createContext, useState } from 'react';
import './App.css';
import Login from './login/Login'
import Pricing from './pricing/Pricing'
import Checkout from './checkout/Checkout'
import SignUp from './register/SignUp'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Navigation } from './Navigation'
// import AuthProvider from './AuthProvider'
// import { ProtectedRoute } from './ProtectedRoute'
// import { useAuth } from './AuthProvider';
import { login } from './login/Login';
import AdminButton from './adminButton/AdminButton';

// const AuthContext = React.createContext(null);

function App() {
  const [email, setUsername] = useState(null);
  // const handleLogin = async () => {
  //   setUsername('ducle')
  // }
  // const handleLogout = () => {
  //   setUsername(null);
  // };
  // if (!email) {
  //   return <Login setUser={setUsername} />
  // }

  // render() {
  return (

    <Router>
      <AuthProvider value={email}>
        {/* <Router> */}
        <Navigation></Navigation>
        <Routes>
          {/* <Route exact path='/' element={< Home />}></Route> */}
          <Route path='/login' element={< Login />}></Route>
          <Route path='/pricing' element={< Pricing />}></Route>
          {/* <Route path='/checkout' element={< Checkout />}></Route> */}
          <Route path='/register' element={< SignUp />}></Route>
          <Route path='/activate' element={< AdminButton />}></Route>
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={< Login />}></Route>
        </Routes>
        {/* </Router> */}
      </AuthProvider>
    </Router>
  );
  // }
}
const ProtectedRoute = ({ children }: any) => {
  const { email } = useAuth();
  const location = useLocation();

  if (!email) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setUsername] = React.useState(null);

  const handleLogin = async (email: string, password: string) => {
    console.log('handle login')
    const usr = await login(email, password);
    console.log(`userName: ${usr}`)
    if (usr) {
      setUsername(usr);
      // const origin = location.state?.from?.pathname || '/pricing';
      const origin = '/pricing';
      console.log(`origin: ${origin}`)
      navigate(origin);
    }
  };

  const handleLogout = () => {
    setUsername(null);
  };

  const value = {
    email,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return React.useContext(AuthContext);
};
export default App;
