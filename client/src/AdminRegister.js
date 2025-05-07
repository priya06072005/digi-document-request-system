import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", data); // Debugging step
  
    axios.post("http://localhost:5000/adminregister", data)
      .then((res) => alert(res.data))
      .catch((err) => console.error("Error:", err));
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Register</h3>
        <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            onChange={changeHandler}
            name="username"
            placeholder="User Name"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            placeholder="Email"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Password"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            onChange={changeHandler}
            name="confirmpassword"
            placeholder="Confirm Password"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
