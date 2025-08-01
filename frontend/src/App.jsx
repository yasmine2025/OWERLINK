import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import CreateService from "./CreateService";
import LoginPage from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addService = (newService) => {
    setServices([newService, ...services]);
  };

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home services={services} />} />
          <Route
            path="/create-service"
            element={
              isLoggedIn ? (
                <CreateService onAddService={addService} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;