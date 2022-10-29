import { NavLink } from "react-router-dom";
// import { useAuth } from "./AuthProvider";
import { useAuth } from "./App";

export const Navigation = () => {
  const { username, onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/checkout">Checkout</NavLink>
      <NavLink to="/register">Sign Up</NavLink>
      {username && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};
