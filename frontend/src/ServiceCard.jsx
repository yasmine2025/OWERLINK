import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate(); 

  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userId = decoded?.id;

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('✅ Supprimé');
        window.location.reload();
      } else {
        const err = await res.json();
        alert('❌ Erreur : ' + err.error);
      }
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/create/${id}`); // ✅ Redirection vers page d'édition
  };

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
          <span>Publié le {new Date(service.date).toLocaleDateString()}</span>
        </div>
      </div>

      {service.createdBy === userId && (
        <div className="service-actions">
          <button onClick={() => handleEdit(service._id)}>✏️ Modifier</button>
          <button onClick={() => handleDelete(service._id)}>🗑️ Supprimer</button>
        </div>
      )}
    </div>
  );
};


export default ServiceCard;