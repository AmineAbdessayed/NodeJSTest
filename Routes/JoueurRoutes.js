const express = require('express');
const router = express.Router();
const JoueurController = require('../Controller/JoueurController');



router.post('/newjoueur', JoueurController.addJoueur);
router.get('/getalljoueur', JoueurController.getAllJoueurs);
router.get('/getjoueur/:id', JoueurController.getJoueurById);
router.delete('/deletejoueur/:id', JoueurController.DeleteJoueur);
router.put('/attack/:id1/:id2', JoueurController.Attack);


module.exports = router;