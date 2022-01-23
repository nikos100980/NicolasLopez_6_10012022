const express = require('express');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

const router = express.Router();
// ---------------------------------------------------------Les differentes routes concernant les sauces----------------------------------------------------
router.post('/',multer, sauceCtrl.createSauce);
router.get('/',sauceCtrl.getAllSauce);
router.get('/:id',sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id',sauceCtrl.deleteSauce);
router.post('/:id/like',sauceCtrl.likeSauce);

module.exports = router;