const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPosts);
router.put('/:id', auth, multer, postCtrl.modifyPosts);
router.delete('/:id', auth, postCtrl.deletePosts);
router.post('/:id/like', auth, postCtrl.postsLikes);

module.exports = router;