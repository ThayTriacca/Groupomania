const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');
const user = require('../models/user');
const multer = require('../middleware/multer-config');
const e = require('express');

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
            token: token,
            firstName: user.firstName
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

exports.updateprofile = async (req, res, next) => {
    try {
        const url = req.protocol + '://' + req.get('host');
      const userId = req.params.id; 
      console.log('UserId:', userId);
      console.log('UserData:', req.body);
      const user = await db.User.findOne({
        where: {
          id: userId
        }
      });
      console.log('User:', user);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else if (user.id != userId) { 
        console.log('userId:', userId, 'user.id:', user.id);
        res.status(403).json({ message: 'Access not allowed' });
      } else {
        let updatedUserData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profilePicture: req.file ? url + '/images/' + req.file.filename : null
          };
          const updatedUser = await user.update(updatedUserData);
        console.log('Updated User:', updatedUser);
        res.status(200).json({
          message: 'Updated successfully!',
          user: updatedUser
        });
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        console.log('UserId:', userId);
        console.log('UserData:', req.body);
        const user = await db.User.destroy({
          where: {
            id: userId
          }
        });
        if (user) {
            res.status(200).json({
                success: 'User deleted!'
            })
        } else {
            res.status(401).json({
                error: 'Unsuccessful'
            })
        }
    } catch (error) {
        next(error);
    }
}
