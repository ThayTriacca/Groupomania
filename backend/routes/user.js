const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.get('/:id', userCtrl.displayUser);
router.put('/:id', auth, multer, userCtrl.updateprofile);


module.exports = router;