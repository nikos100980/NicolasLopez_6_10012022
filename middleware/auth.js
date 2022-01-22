// Creation d'un middleware pour l'authentification


const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify( token, '');
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid user Id';
        }else{
            next();
        }
    } catch(error){
        res.status(401).json({ error: error | 'Req non authentifiée' });
    }

};

