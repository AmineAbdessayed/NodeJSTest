const express = require('express');
const router = express.Router();
const PartieController = require('../Controller/PartieController');
const ViewsController = require('../views/PartieViewsRouter');

router.get('/', PartieController.getAllParties);
router.post('/newPartie/:id1/:id2', PartieController.addPartie);




module.exports = router;