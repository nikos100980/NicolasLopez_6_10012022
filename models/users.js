// -----------------------------------------Le modele incluant le schéma utilisateur

// Importation du module mongoose afin de pouvoir exporter notre schema vers la BBD
const mongoose = require("mongoose");

//  Importation du module mongoose-unique-validator afin d'appliquer la methode permettant de nous assurer que l'utilisateur qui va s'inscrire avec son email est bien le seul et unique a etre present dans la BBD
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("users", userSchema);
