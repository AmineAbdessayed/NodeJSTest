const Joueur = require('../Models/Joueur');
const Partie = require('../Models/Partie');


exports.getAllParties = async (req, res) => {
  try {
    const parties = await Partie.find();
    res.json(parties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






exports.addPartie = async (req, res) => {
  const { id1, id2 } = req.params;
  const { nom } = req.body;

  try {
    const joueur1 = await Joueur.findById(id1);
    const joueur2 = await Joueur.findById(id2);

    if (!joueur1 || !joueur2) {
      return res.status(404).json({ error: 'Joueur not found' });
    }

    const partie = new Partie({
      nom,
      etat: 'en cours',
      joueur_1: joueur1._id,
      joueur_2: joueur2._id,
    });

    await partie.save();

    // Render the add.twig template with a success message
    res.render('add.twig', {
      title: 'Add Partie',
      message: 'La partie a été ajoutée avec succès.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/*
exports.showPartiesPage = async (req, res) => {
  try {
    const parties = await PartieController.getAllParties(); // Call the method using PartieController
    res.render('parties.twig', { parties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/