import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaTags } from 'react-icons/fa';
import './styles.css';

const ServiceCard = ({ service }) => {
  // Fonction pour générer une couleur aléatoire basée sur la catégorie
  const getCategoryColor = (category) => {
    const colors = {
      'Jardinage': '#4CAF50',
      'Cours à domicile': '#2196F3',
      'Bricolage': '#FF9800',
      'Soins à domicile': '#E91E63',
      'Informatique': '#9C27B0',
      'default': '#607D8B'
    };
    return colors[category] || colors['default'];
  };

  return (
    <div className="service-card" style={{ borderTop: `4px solid ${getCategoryColor(service.categorie)}` }}>
      <div className="service-card-header">
        <h3 className="service-title">{service.titre}</h3>
        <span className="service-category" style={{ backgroundColor: getCategoryColor(service.categorie) }}>
          {service.categorie}
        </span>
      </div>
      
      <p className="service-description">{service.description}</p>
      
      <div className="service-details">
        <div className="service-detail-item">
          <FaMapMarkerAlt className="detail-icon" />
          <span>{service.adresse}</span>
        </div>
        
        <div className="service-detail-item">
          <FaPhone className="detail-icon" />
          <span>{service.contact}</span>
        </div>
      </div>
      
      <div className="service-footer">
        <div className="service-date">
          <FaCalendarAlt className="date-icon" />
          <span>Publié le {service.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;