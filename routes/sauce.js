const express = require('express');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

const router = express.Router();
// ---------------------------------------------------------Les differentes routes concernant les sauces----------------------------------------------------

// Chaques routes demarre avec le middleware d'authentification afin de s'assurer que l'utilisateur est bien celui qui effectue les actions avant de les faires
router.post('/',auth, multer, sauceCtrl.createSauce);
router.get('/',auth,sauceCtrl.getAllSauce);
router.get('/:id',auth, sauceCtrl.getOneSauce);
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',auth,sauceCtrl.deleteSauce);
router.post('/:id/like',sauceCtrl.likeSauce);

module.exports = router;