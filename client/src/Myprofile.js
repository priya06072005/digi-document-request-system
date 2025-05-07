import React, { useContext, useState, useEffect } from "react";
import { store } from "./App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImage from "./profile.jpeg";

const Myprofile = () => {
  const [token] = useContext(store);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/myprofile", {
        headers: { "x-token": token },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token, navigate]);

  const handleGetStarted = () => {
    navigate("/home");
  };

  if (!token) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#f9fafb",
        textAlign: "center",
        padding: "0px 0px", 
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #2563eb, #9333ea)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "15px",
        }}
      >
        DigiDoc – Where efficiency meets security.
      </h1>

      <img
        src={profileImage}
        alt="User Profile"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "15px",
          border: "3px solid #ccc",
        }}
      />

      {data ? (
        <>
          <h2 style={{ fontSize: "26px", fontWeight: "bold", color: "#333" }}>
            Welcome, <span style={{ textTransform: "capitalize", fontWeight: "bold" ,fontSize: "26px",
          
          background: "linear-gradient(90deg, #2563eb, #9333ea)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "15px",}}>{data.username}</span>!
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              maxWidth: "600px",
              marginBottom: "20px",
            }}
          >
            DIGIDOC is a <strong>smart document request and verification system</strong>
            using <strong>AI & OCR</strong>. Experience seamless authentication,
            secure document requests, and automated approvals.
          </p>

          <button
            onClick={handleGetStarted}
            style={{
              padding: "14px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease, transform 0.2s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#1d4ed8";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#2563eb";
              e.target.style.transform = "scale(1)";
            }}
          >
            Get Started
          </button>
        </>
      ) : (
        <h2 style={{ fontSize: "22px", color: "#666" }}>Loading...</h2>
      )}
    </div>
  );
};

export default Myprofile;