const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');

exports.signup = async (req, res, next) => {
    console.log(req.body);
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new db.User({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
        });
       await user.save();
       return  res.status(200).json({
            message: 'User added successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }

   // return res.status(200).json({'çola':'getg'});
};

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({where: {email: req.body.email}});
        if (!user) {
            return res.status(401).json({
                error: new Error('User not found!')
            });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({
                error: new Error('Incorrect Password!')
            });
        }
        const token = jwt.sign(
            {userId: user.id},
            'SECRET_TOKEN_GROUPOMANIA',
            {expiresIn: '24h'}
        );
        res.status(200).json({
            userId: user.id,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

exports.logout = (req, res, next) =>{
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        } else {
          res.json({ message: 'Logout bem sucedido' });
        }
      });
 };