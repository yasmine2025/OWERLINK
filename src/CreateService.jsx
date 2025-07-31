import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateService = ({ onAddService }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    contact: '',
    adresse: '',
    categorie: '',
    date: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService(formData);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Proposer un service</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre du service</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />

        <label>Description du service</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label>Adresse</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
        />

        <label>Catégorie</label>
        <select
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une catégorie</option>
          <option value="Jardinage">Jardinage</option>
          <option value="Cours à domicile">Cours à domicile</option>
          <option value="Bricolage">Bricolage</option>
          <option value="Soins à domicile">Soins à domicile</option>
          <option value="Informatique">Informatique</option>
        </select>

        <p className="date-info">Date de publication : {formData.date}</p>

        <div className="button-group">
          <button type="submit">Poster le service</button>
        </div>
      </form>
    </div>
  );
};

export default CreateService;