import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard"; 
import "./styles.css";


const Home = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((service) =>
    (service.titre && service.titre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (service.categorie && service.categorie.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Trouvez des services locaux ou partagez vos talents</h1>
          <p>OwerLink connecte votre communauté en quelques clics</p>
          <div className="hero-buttons">
            <Link to="/create" className="cta-button">Proposer un service</Link>
            <a href="#services" className="secondary-button">Découvrir les services</a>

          </div>
        </div>
        
             <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/3749/3749784.png" alt="Communauté connectée" />
        </div>
        
      </section>

      {/* 2. Statistiques */}
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">1,248+</span>
          <span className="stat-label">Services proposés</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">893+</span>
          <span className="stat-label">Utilisateurs actifs</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">96%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>

      {/* 3. Barre de recherche */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔍 Chercher un service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* 4. Grille de services */}
      <div id="services" className="services-section">
        <h2 className="section-title">Services récents</h2>
        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <ServiceCard key={index} service={service} /> 
            ))}
          </div>
        ) : (
          <div className="no-services">
            <p>Aucun service disponible pour le moment. Soyez le premier à en proposer un !</p>
          </div>
        )}
      </div>

      {/* 5. Comment ça marche */}
      <div className="how-it-works">
        <h2 className="section-title">Fonctionnement en 3 étapes</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Créez un compte</h3>
            <p>Inscription gratuite en 2 minutes</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Postez ou cherchez</h3>
            <p>Décrivez votre besoin ou service</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connectez-vous</h3>
            <p>Échangez directement via la messagerie</p>
          </div>
        </div>
      </div>

      {/* 6. Section à venir */}
      <section className="coming-soon">
        <p>📢 D'autres fonctionnalités arrivent bientôt !</p>
      </section>
    </div>
  );
};

export default Home;
