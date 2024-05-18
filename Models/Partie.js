const mongoose = require('mongoose');

const partieSchema = new mongoose.Schema({
  nom: String,
  joueur_1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
  }
  , 
  
  joueur_2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
  },
    etat: String,
});

const Partie = mongoose.model('Partie', partieSchema);

module.exports = Partie;