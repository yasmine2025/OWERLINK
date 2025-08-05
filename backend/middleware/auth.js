// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // 1. Récupère le token depuis le header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // 2. Si pas de token → erreur 401
  if (!token) {
    return res.status(401).json({ 
      error: 'Accès refusé. Token manquant.' 
    });
  }

  // 3. Vérifie le token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Injecte l'ID utilisateur dans la requête
    next();
  } catch (err) {
    res.status(400).json({ 
      error: 'Token invalide ou expiré.' 
    });
  }
};