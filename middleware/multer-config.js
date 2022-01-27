// -----------------------------------------------------------Configuration du module MULTER -------------------------------------------------

// Importation du module MULTER afin de mettre en place le systeme de telechargement de fichiers sur notre API
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback( null, 'images')
    },
    filename: ( req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback( null, name + Date.now() + '.'+ extension);

    }
});

module.exports = multer({ storage: storage}).single('image');