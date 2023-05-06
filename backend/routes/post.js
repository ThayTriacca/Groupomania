const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', multer, postCtrl.createPosts);
router.put('/:id', multer, postCtrl.modifyPosts);
router.delete('/:id', auth, postCtrl.deletePosts);
router.patch('/:id/read', auth, postCtrl.readPosts);
router.patch('/:id/unread', auth, postCtrl.unreadPosts);

module.exports = router;