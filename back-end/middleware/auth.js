const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_TOKEN_HOTTAKES');
        const iduser = decodedToken.iduser;
        req.auth = {iduser};
        if (req.body.iduser && req.body.iduser !== iduser){
            throw 'Invalid user ID!';
        } else{
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid Request!')
        });
    }
};