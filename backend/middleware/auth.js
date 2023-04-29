const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_TOKEN_GROUPOMANIA');
        const userId = decodedToken.userId || sessionStorage.getItem('userId');
        req.auth = { userId };
        console.log(userId);
        console.log("req " + req.body.userId);
        if (req.body.userId && req.body.userId != userId) {
            throw { name: 'InvalidUserIdError', message: 'Invalid user ID!' };
        } else {
            res.locals.userId = userId;
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: {
                name: error.name || 'UnknownError',
                message: error.message || 'Invalid request!',
            },
        });
    }
};

// const jwt = require('jsonwebtoken');


// module.exports = (req, res, next) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'SECRET_TOKEN_GROUPOMANIA');
//         const userId = decodedToken.userId;
//         req.auth = {userId};
//         if (req.body.userId && req.body.userId !== userId){
//             throw 'Invalid user ID!';
//         } else{
//             res.locals.userId = userId
//             next();
//         }
//     } catch {
//         res.status(401).json({
//             error: new Error('Invalid Request!')
//         });
//     }
// };