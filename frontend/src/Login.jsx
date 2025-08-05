import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      onLogin(); // 🔐 active le login
      navigate("/create"); // redirige vers création de service
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="form-container">
        <h2 className="form-title">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Se connecter</button>
      </form>

      {/* 🔽 Lien vers l'inscription */}
      <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
    </div>
  );
};

export default LoginPage;
