const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  adresse: { type: String, required: true },
  categorie: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
