//--------------------------------------------------------------------------- Creation d'un middleware pour l'authentification---------------------------------------------------------

// Importation du module JSONWEBTOKEN pour la mise en place de la gestion d'authentification par TOKEN
const jwt = require("jsonwebtoken");



module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      `${process.env.RANDOM_TOKEN_SECRET}`
    );
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user Id";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Req non authentifiée" });
  }
};
