const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
  pseudo: String,
  sante: Number,
  score: Number,
});

const Joueur = mongoose.model('Joueur', joueurSchema);

module.exports = Joueur;