
// Importation du framework EXPRESS pour la creation de l'API
const express = require("express");

// Importation de mongoose pour faire interagir le backend avec la BBD
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const path = require("path");
const sauceRoutes = require("./routes/sauce");

// importation du module de sécurité pour les en-têtes HTTP afin proteger certaines vulnerabilités de l'API
const helmet = require("helmet");

// Ajout de variables d'environnement
require("dotenv").config();
// Ajout du module mongoose pour connecter la BBD avec notre API
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet({crossOriginResourcePolicy: false}));

app.use(express.json());

// Configuration des CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
