const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');
const user = require('../models/user');

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
      return res.status(401).json({ message: 'Token not given!' });
    }
    jwt.verify(token, SECRET_TOKEN_GROUPOMANIA, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid Token!' });
        } else {
          res.json({ message: 'Logout!' });
        }
      });
 };

exports.displayUser = (req, res, next) => {
    db.User.findOne({
        where: {
            id: req.params.id
        }
        // attributes: {
        //     exclude: ['password']
        // }
    })
    .then ((user) => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

exports.updateprofile = (req, res, next) => {
    const userId = req.params.userId; // Use o ID do usuário da URL
    const {userData} = req.body;
  
    db.User.update({
      where: {
        id: userId // Use o ID do usuário da URL
      }
    })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else if (user.id !== userId) {
        res.status(403).json({ message: 'Access not allowed' });
      } else {
        return user.update({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicture: url + '/images/' + req.file.filename
        });
      }
    })
    .then(updatedUser => {
      res.status(200).json({
        message: 'Updated successfully!',
        user: updatedUser
      });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
  };
  
  

//exports.deleteuser