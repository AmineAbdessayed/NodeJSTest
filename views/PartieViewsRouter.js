const express = require('express');
const router = express.Router();
const Partie = require('../Models/Partie');

router.get('/', async (req, res) => {
  try {
    Partie.find({})
      .then(parties => {
        console.log("Fetched parties:", parties); 
        res.render('parties.twig', {
          title: 'Contact list',
          parties: parties
        });
      })
      .catch(err => {
        console.error('Error fetching parties:', err);
        res.status(500).send('Error fetching parties');
      });
  } catch (err) {
    console.error('Error fetching parties:', err);
    res.status(500).send('Error fetching parties');
  }
});

module.exports = router;