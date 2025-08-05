// Charger les variables d'environnement
require('dotenv').config();  

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("🔍 Tentative de connexion avec URI:", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ✅ Importer les routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// ✅ Route test
app.get('/api/test', (req, res) => {
  res.json({ message: "API OwerLink opérationnelle 🎉" });
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend OwerLink !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
