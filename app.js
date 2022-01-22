const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const path = require('path');
const sauceRoutes = require('./routes/sauce');


mongoose
  .connect(
    "mongodb+srv://nikos3101:PiuUEIVMg63YDy2z@cluster0.ss2hd.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname,'images')));  
app.use('/api/auth',userRoutes);
app.use('/api/sauces', sauceRoutes);








module.exports = app;