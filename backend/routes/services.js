const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');

// 🔹 POST - Créer un service (authentifié)
router.post('/', auth, async (req, res) => {
  try {
    const { titre, description, contact, adresse, categorie } = req.body;

    const newService = new Service({
      titre,
      description,
      contact,
      adresse,
      categorie,
      createdBy: req.userId,
      date: new Date()
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: 'Erreur de création : ' + err.message });
  }
});

// 🔹 GET - Obtenir tous les services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ date: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Erreur de récupération : ' + err.message });
  }
});

// 🔹 PUT - Modifier un service (authentifié)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Service non trouvé ou non autorisé' });
    }

    res.json(service);
  } catch (err) {
    res.status(400).json({ error: 'Erreur de mise à jour : ' + err.message });
  }
});

// 🔹 DELETE - Supprimer un service (authentifié)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!service) {
      return res.status(404).json({ error: 'Service non trouvé ou non autorisé' });
    }

    res.json({ message: 'Service supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur : ' + err.message });
  }
});

// 🔹 GET - Rechercher des services (public)
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q || '';

    const services = await Service.find({
      $or: [
        { titre: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { categorie: { $regex: searchQuery, $options: 'i' } },
        { adresse: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Erreur de recherche : ' + err.message });
  }
});

// 🔹 GET - Récupérer le service du user connecté
router.get('/mine', auth, async (req, res) => {
  try {
    const service = await Service.findOne({ createdBy: req.userId });
    if (!service) return res.status(404).json({ message: 'Aucun service trouvé' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Erreur de récupération : ' + err.message });
  }
});

module.exports = router;
