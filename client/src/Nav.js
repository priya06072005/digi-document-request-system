import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { store } from "./App";

const Nav = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar on Home Page
  if (location.pathname === "/home") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    setToken(null); // Update context state
    
    // Redirect based on the current location
    if (location.pathname === "/adminprofile" || location.pathname === "/canvasadmin") {
      navigate("/admin"); // Redirect to Admin Login
    } else {
      navigate("/login"); // Redirect to User Login
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>DIGIDOC<br /><span style={styles.tagline}>Smart. Secure. Seamless.</span></h2>

      <ul style={styles.navList}>
        {location.pathname === "/admin" ? (
          // ✅ Admin Page - Show Only Admin Login
          <li>
            <Link to="/admin" style={styles.link}>Admin Login</Link>
          </li>
        ) : location.pathname === "/adminprofile" || location.pathname === "/admindashboard" ? (
          // ✅ Admin Dashboard & Canvas Admin - Show Only Logout
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </li>
        ) : location.pathname === "/" ? (
          // ✅ Localhost:3000 - Show Only Register, Login & Admin Login
          <>
            <li>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
            <li>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
            <li>
              <Link to="/admin" style={styles.link}>Admin Login</Link>
            </li>
          </>
        ) : token ? (
          // ✅ User Logged In - Show My Profile & Logout
          <>
            <li>
              <Link to="/myprofile" style={styles.link}>My Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </li>
          </>
        ) : (
          // ✅ Default - Show Register, Login & Admin Login
          <>
            <li>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
            <li>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
            <li>
              <Link to="/admin" style={styles.link}>Admin Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// ✅ Styling for Navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "white",
  },
 
  navList: { listStyle: "none", display: "flex", gap: "20px", padding: 0 },
  link: { color: "white", textDecoration: "none", fontSize: "16px" },
  logoutButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "ffffff",  // A professional blue color
    textAlign: "center",
    letterSpacing: "1px",  // Adds spacing between letters
    textTransform: "uppercase",  // Makes the text uppercase for emphasis
    marginBottom: "10px",
    fontFamily: "'Roboto', sans-serif",  // Clean, modern font
  },
  tagline: {
    fontSize: "10px",
    fontWeight: "400",  // Lighter weight for the tagline
    color: "#555",  // Dark grey for contrast
    fontStyle: "italic",  // Adds emphasis to the tagline
    display: "block",  // Displays on a new line
    marginTop: "5px",  // Adds space between the title and tagline
  }
};

export default Nav;
