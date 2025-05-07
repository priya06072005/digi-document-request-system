import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { store } from "./App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  // useEffect to handle navigation after render
  useEffect(() => {
    if (token) {
      navigate("/myprofile");
    }
  }, [token, navigate]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        // Store the token and user information in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Update the context with the token
        setToken(res.data.token);

        // Navigation will be handled by useEffect
      })
      .catch((err) => {
        alert("Login failed! Check your credentials.");
        console.error(err);
      });
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
        <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Login</h3>
        <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
