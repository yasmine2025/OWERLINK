import React, { useState, useEffect } from "react"; 
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import CreateService from "./CreateService";
import LoginPage from "./Login";
import Register from "./Register"; 
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [services, setServices] = useState([]);

  // ✅ Test backend
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Réponse backend (test) :", data);
      })
      .catch((err) => {
        console.error("❌ Erreur de connexion au backend :", err);
      });
  }, []);

  // ✅ Récupération des services
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Services récupérés :", data);
        setServices(data);
      })
      .catch((err) => {
        console.error("❌ Erreur de récupération des services :", err);
      });
  }, []);

  // ✅ Connexion / déconnexion
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home services={services} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} /> 
        <Route
          path="/create"
          element={isLoggedIn ? <CreateService /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
