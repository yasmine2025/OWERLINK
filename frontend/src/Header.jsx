import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1 className="site-title">
          <span className="logo-ower">Ower</span>
          <span className="logo-link">Link</span>
        </h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/create">Proposer un service</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
