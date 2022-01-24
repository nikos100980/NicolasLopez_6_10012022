//------------------------------------------------------------------- les differents controllers---------------------------------------------------------
const Sauce = require("../models/sauce");
const fs = require("fs");



// Controller pour la creation de l'objet sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "La sauce a bien été ajoutée !" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

//Controller pour la recuperation de l'ensemble des sauces créées par les utilisateurs
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(404).json({ error: error }));
};
// Controller pour la recuperation d'une sauce en particulier
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
// Controller pour modifier une sauce uniquement faites par l'utilisateur créateur
exports.modifySauce = (req, res, next) => {
console.log("----->ROUTE PUT: modyfySauce");
console.log(req.params.id);
console.log({_id: req.params.id});

console.log("---->CONTENU:req.body");
console.log(req.body);

console.log("------>CONTENU PUT: req.file");
console.log(req.file);

  if (req.file) {
      console.log("TRUE");
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          console.log("------->Le retour de la promesse");
          console.log(sauce);
        const fileName = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${fileName}`, (err) => {
          if (err) throw (err);
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    console.log("Image supprimée: " );
  }

  //  Puis mise à jour de l'objet sauce
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(404).json({ error }));
};

// Controller pour supprimer l'objet sauce ainsi que la photo associé dans le dossier images

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
// Controller permettant la gerstion des likes et dislikes
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 1:
          if (!sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Le like a bien été pris en compte" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case -1:
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Le dislike a bien été pris en compte" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
            )
              .then(() =>
                res.status(201).json({ message: "Le like est bien neutre" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({
                  message:
                    "L'utilisateur est present dans le tableau des dislike utilisateurs et le like est bien neutre",
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }

          break;
        default:
          console.log(error);
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
