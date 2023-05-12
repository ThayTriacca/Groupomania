const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('Auth middleware called');
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            throw { name: 'MissingTokenError', message: 'Token JWT not present!' };
        }
        const decodedToken = jwt.verify(token, 'SECRET_TOKEN_GROUPOMANIA');
        const userId = decodedToken.userId || sessionStorage.getItem('userId');
        console.log('User ID:', userId);
        if (!userId) {
            throw { name: 'AuthenticationError', message: 'Invalid token!' };
        }
        req.user = { id: userId };
        next();
    } catch (error) {
        console.log('Auth error:', error);
        res.status(401).json({ error });
    }
};


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'SECRET_TOKEN_GROUPOMANIA');
//         const userId = decodedToken.userId || sessionStorage.getItem('userId');
//         req.auth = { userId };
//         console.log(userId);
//         console.log("req " + req.body.userId);
//         if (req.body.userId && req.body.userId != userId) {
//             throw { name: 'InvalidUserIdError', message: 'Invalid user ID!' };
//         } else {
//             res.locals.userId = userId;
//             next();
//         }
//     } catch (error) {
//         res.status(401).json({
//             error: {
//                 name: error.name || 'UnknownError',
//                 message: error.message || 'Invalid request!',
//             },
//         });
//     }
// };
