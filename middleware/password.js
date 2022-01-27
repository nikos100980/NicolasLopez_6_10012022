
// Importation du module PASSWORD-VALIDATOR afin de mieux securiser notre password en lui mettant une force ( recommandation RGPD et OWASP)
const pswd = require('password-validator');

const schemaPassValid = new pswd();


// Creation du schema pour les conditions du password fort
schemaPassValid
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values




module.exports = (req,res,next)=>{
    if(schemaPassValid.validate(req.body.password)){
    next();
    }
    else{
        return res.status(400).json({ error : 'Pour votre sécurité, veuillez choisir un mot de passe compris entre 8 et 20 caracteres ,comportant au moins 2 chiffres et 1 majuscule ! '})
    
    }
};