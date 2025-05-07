import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";
import Myprofile from "./Myprofile";
import Home from "./Home";
import Admin from "./Admin";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import AdminProfile from "./AdminProfile";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import Welcome from "./welcome";

import { DarkModeProvider } from "./DarkModeContext";

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  return (
    <DarkModeProvider>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminregister" element={<AdminRegister />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </DarkModeProvider>
  );
};

export default App;
