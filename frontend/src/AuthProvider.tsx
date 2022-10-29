import * as React from 'react'
import {login} from './login/Login';
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = React.createContext(null);

export default function AuthProvider({ children }: any): any {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = React.useState(null);

  const handleLogin = async (username: string, password: string) => {
    const token = await login(username, password);
    setUsername(token);
    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  const value = {
    username,
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