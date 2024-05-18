const Joueur = require('../Models/Joueur');


exports.addJoueur = async (req, res) => {
  const { pseudo, sante, score } = req.body;

  try {
    const joueur = new Joueur({
      pseudo,
      sante:100,
      score:0,
    });

    await joueur.save();

    res.json(`Le joueur a été ajouté avec succès : `+joueur.pseudo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJoueurs = async (req, res) => {
  try {
    const joueurs = await Joueur.find();
    res.json(joueurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getJoueurById = async (req, res) => {
  const { id } = req.params;

  try {
    const joueur = await Joueur.findById(id);
    console.log(joueur)
    if (!joueur) {
      return res.status(404).json({ error: 'Joueur not found' });
    }
    res.json(joueur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.DeleteJoueur = async (req, res) => {
  const { id } = req.params;

  try {
    const joueur = await Joueur.findByIdAndDelete(id);
    if (!joueur) {
      return res.status(404).json({ error: 'Joueur not found' });
    }
    res.json("joueur supprimé avec succès");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.Attack = async (req, res) => {
  const { id1 ,id2} = req.params;


  try {
    const joueur1 = await Joueur.findById(id1);
     const joueur2 = await Joueur.findById(id2);

     if(!joueur1 ||!joueur2) {
      return res.status(404).json({ error: 'Joueur not found' });
    }
      joueur1.score+=10;
     joueur2.sante-=20;

     await joueur1.save();
    await joueur2.save();
   
  
    res.json("Attaque effectuée avec succès");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



