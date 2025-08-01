import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de connexion - en phase 2, vous vérifierez avec le backend
    if (email && motDePasse) {
      onLogin();
      navigate("/create-service");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🔐 Connexion</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email :</label>
          <input
            type="email"
            placeholder="exemple@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;