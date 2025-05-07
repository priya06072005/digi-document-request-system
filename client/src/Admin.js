import { useState } from "react";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";

function Admin() {
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Panel</h2>
      <div style={styles.buttonGroup}>
        <button
          onClick={() => setIsRegistering(true)}
          style={isRegistering ? styles.activeButton : styles.button}
        >
          Register
        </button>
        <button
          onClick={() => setIsRegistering(false)}
          style={!isRegistering ? styles.activeButton : styles.button}
        >
          Login
        </button>
      </div>
      <div style={styles.formContainer}>
        {isRegistering ? <AdminRegister /> : <AdminLogin />}
      </div>

     
      
    </div>
  );
}

// ✅ CSS Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  activeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  formContainer: {
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default Admin;
