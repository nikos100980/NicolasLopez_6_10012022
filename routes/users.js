// ------------------------------------------------------------Les routes necessaires a notre utilisateur-------------------------------------------------


const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const password = require('../middleware/password');

// Creation de la route pour s'inscrire en passant d'abord par le middleware password pour s'assurer de la force du mot de passe choisi puis si ok on passe la suite
router.post('/signup',password, userCtrl.signup);

// Creation de la route pour se connecter 
router.post('/login', userCtrl.login);

module.exports = router;

