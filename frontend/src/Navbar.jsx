import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">OurLink</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-button">Accueil</Link>
        <Link to="/create" className="nav-button">Proposer un service</Link>
        <Link to="/login" className="nav-button">Connexion</Link>
      </div>
    </nav>
  );
}

export default NavBar;

