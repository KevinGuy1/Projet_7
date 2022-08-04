// importation des fonctions installées
const express = require("express");
const router = express.Router();

// importation des routes
const userCtrl = require("../controllers/user");

// Mise en place des router pour les requêtes signup et login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Gestion des users ??
// CRUD User
// getAllUsers
// getCurrentUser
module.exports = router;
