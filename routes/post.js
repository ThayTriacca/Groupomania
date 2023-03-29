const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllposts);
router.get('/:id', postCtrl.getOnepost);
router.post('/', auth, multer, postCtrl.createpost);
router.put('/:id', auth, multer, postCtrl.modifypost);
router.delete('/:id', auth, postCtrl.deletepost);
router.post('/:id/like', auth, postCtrl.postLikes);

module.exports = router;