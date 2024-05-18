const Joueur = require('../Models/Joueur');
const Partie = require('../Models/Partie');
const express = require("express");


async function attaqueSocket(data) {
    try {
      const j1 = await Joueur.findById(data.id1);
      const j2 = await Joueur.findById(data.id2);
      score1 = j1.score + 10;
      sante2 = j2.sante - 20;
      console.log("score 1: " + score1 + "sante2: " + sante2);
      const j1u = await Joueur.findByIdAndUpdate(data.id1, {
        score: score1,
      });
      const j2u = await Joueur.findByIdAndUpdate(data.id2, {
        score: sante2,
      });
  
      res.send(j1u + j2u);
    } catch (err) {
      res.send(err);
    }
  }
  async function afficherSocket(data) {
    try {
      console.log(data.id1);
      const j1 = await Joueur.findById(data.id1);
      const j2 = await Joueur.findById(data.id2);
      r = { j1: j1, j2: j2 };
      return r;
    } catch (err) {
      res.send(err);
    }
  }
  async function addPartieSocket(data) {
    try {
      const Partie = new Partie({
        nom: data.nom,
        joueur1: data.id1,
        joueur2: data.id2,
        etat: "en cours",
        gagnant: "",
      });
  
      const j1u = await Joueur.findByIdAndUpdate(data.id1, {
        sante: 100,
      });
      const j2u = await Joueur.findByIdAndUpdate(data.id2, {
        sante: 100,
      });
      await Partie.save();
      console.log("add success");
    } catch (err) {
      console.log({ error: error.toString() });
    }
  }

  module.exports = {
  
    attaqueSocket,
    addPartieSocket,
    afficherSocket,
  };