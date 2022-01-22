
const Sauce = require('../models/sauce');


exports.createSauce = (req, res, next)=>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],

    });
    sauce.save()
    .then(()=> {
        res.status(201).json({ message: 'La sauce a bien été ajoutée !'});
    }).catch((error)=> res.status(400).json({ error: error}));
};



exports.getAllSauce = (req, res, next)=>{
    Sauce.find()
    .then((sauces)=>{
        res.status(200).json(sauces);
    }
    )
    .catch((error)=> res.status(404).json({ error: error}));
};

exports.getOneSauce = (req, res, next)=>{
    Sauce.findOne({ _id: req.params.id})
    .then(sauce =>res.status(200).json(sauce))
    .catch ((error)=>res.status(404).json({ error}));
};

exports.modifySauce= (req, res, next)=>{
    const sauceObject = req.file ? {...JSON.parse(req.body.sauce)}:{...req.body};
    
    
    Sauce.updateOne({ _id: req.params.id}, {...sauceObject,_id: req.params.id})
    .then(()=>{
        res.status(201).json({ message:'La modification de votre sauce a bien été effectuée !'});
    })
    .catch((error)=>res.status(400).json({ error}));
};

exports.deleteSauce = (req,res,next)=>{
    Sauce.deleteOne({ _id: req.params.id})
    .then(()=>res.status(200).json({message:'La sauce a bien été supprimée !'}))
    .catch((error)=>res.status(404).json({ error}));
};

// exports.likeSauce = (req,res,next)=>{
//     if()
// };