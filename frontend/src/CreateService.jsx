import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    contact: '',
    adresse: '',
    categorie: '',
    date: new Date().toLocaleDateString(),
  });
  const [serviceId, setServiceId] = useState(null); // Pour savoir si on modifie ou crée
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyService = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const services = await res.json();
        // On suppose que chaque user ne poste qu’un seul service
        const myService = services.find((s) => s.createdBy === getUserIdFromToken(token));
        if (myService) {
          setFormData({
            titre: myService.titre || '',
            description: myService.description || '',
            contact: myService.contact || '',
            adresse: myService.adresse || '',
            categorie: myService.categorie || '',
            date: new Date(myService.date).toLocaleDateString(),
          });
          setServiceId(myService._id);
        }
      } catch (err) {
        console.error('Erreur récupération service existant', err);
      }
    };

    if (token) fetchMyService();
  }, [token]);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.id;
    } catch {
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = serviceId
      ? `http://localhost:5000/api/services/${serviceId}`
      : 'http://localhost:5000/api/services';
    const method = serviceId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(serviceId ? '✅ Service modifié' : '✅ Service publié');
        navigate('/');
      } else {
        const err = await res.json();
        alert('❌ Erreur : ' + err.error);
      }
    } catch (err) {
      console.error('Erreur publication/modification', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("❌ Confirmer la suppression de votre service ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert("🗑️ Service supprimé");
        setFormData({
          titre: '',
          description: '',
          contact: '',
          adresse: '',
          categorie: '',
          date: new Date().toLocaleDateString(),
        });
        setServiceId(null);
      } else {
        const err = await res.json();
        alert('Erreur : ' + err.error);
      }
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{serviceId ? "Modifier mon service" : "Proposer un service"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre du service</label>
        <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />

        <label>Description du service</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Contact</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Adresse</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />

        <label>Catégorie</label>
        <select name="categorie" value={formData.categorie} onChange={handleChange} required>
          <option value="">Choisir une catégorie</option>
          <option value="Jardinage">Jardinage</option>
          <option value="Cours à domicile">Cours à domicile</option>
          <option value="Bricolage">Bricolage</option>
          <option value="Soins à domicile">Soins à domicile</option>
          <option value="Informatique">Informatique</option>
        </select>

        <p className="date-info">Date de publication : {formData.date}</p>

        <div className="button-group">
          <button type="submit">{serviceId ? "Modifier" : "Publier"} le service</button>
          {serviceId && (
            <button type="button" onClick={handleDelete} className="delete-button">
              Supprimer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateService;
