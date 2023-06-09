const Posts = require('../models/posts');
const fs = require('fs');
const db = require('../models/index');

exports.createPosts = async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const postInfo = req.body;
  const post = db.Posts.create({
    userId: req.body.userId,
    createdByName: req.body.createdByName,
    content: postInfo.content,
    imageUrl: req.file ? url + '/images/' + req.file.filename : null
  }).then((post) => {
    res.status(201).json({ message: 'Post saved successfully!', post });
  }).catch((error) => {
    res.status(400).json({ error: error })
  })
};

exports.getOnePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await db.Posts.findOne({ where: { id } });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyPosts = async (req, res, next) => {
  const { id } = req.params;
  const { iduser, content, readby } = JSON.parse(req.body.post);
  const imageUrl = req.file ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename : req.body.post.imageUrl;
  try {
    const post = await db.Posts.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.iduser = iduser;
    post.content = content;
    post.imageUrl = imageUrl;
    post.readby = readby;
    await post.save();
    res.status(200).json({ message: 'Post updated successfully!', post });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deletePosts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await db.Posts.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const filename = post.imageUrl ? post.imageUrl.split('/images/')[1] : null;
    if (filename) {
      fs.unlink('images/' + filename, () => {
      });
    }

    db.Posts.destroy({ where: { id: id } }).then((result) => {
      if (result == 1) res.status(200).json({ message: 'Post deleted successfully!' });
    }).catch((error) => {
      res.status(400).json({ error });
    });

  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllPosts = async (req, res, next) => {
  console.log('dentro do getall');
  try {
    const posts = await db.Posts.findAll();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.readPosts = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await db.Posts.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    let readByUserIds = post.readby ? post.readby.split(',') : [];

    if (!readByUserIds.includes(userId)) {
      readByUserIds.push(userId);
      post.readby = readByUserIds.join(',');
      await post.save();
    }

    res.json({ message: 'Post marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error!' });
  }
};

exports.markAsUnread = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await db.Posts.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (typeof post.readby !== 'string') {
      post.readby = '';
    }
    const readByUsers = post.readby ? post.readby.split(',') : [];
    if (readByUsers.includes(userId)) {
      const index = readByUsers.indexOf(userId);
      readByUsers.splice(index, 1);
      post.readby = readByUsers.join(',');
      await post.save();
      return res.status(200).json({ message: 'Post marked as unread' });
    }
    return res.status(200).json({ message: 'Post already marked as unread' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error!' });
  }
};
