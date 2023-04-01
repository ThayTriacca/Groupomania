// const Posts = require('../models/posts');
const fs = require('fs');
const db = require('../models/index');

exports.createPosts = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const { iduser, content, postDate } = JSON.parse(req.body.post);
    const media = req.file ? url + '/images/' + req.file.filename : null;
    try {
      const post = await db.Posts.create({ iduser, content, media, postDate, likes: 0 });
      res.status(201).json({ message: 'Post saved successfully!', post });
    } catch (error) {
      res.status(400).json({ error });
    }
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
    const { iduser, content, postDate, likes } = JSON.parse(req.body.post);
    const media = req.file ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename : req.body.post.media;
    try {
      const post = await db.Posts.findOne({ where: { id } });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.iduser = iduser;
      post.content = content;
      post.media = media;
      post.postDate = postDate;
      post.likes = likes;
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
      const filename = post.media ? post.media.split('/images/')[1] : null;
      if (filename) {
        fs.unlink('images/' + filename, () => {
          post.destroy();
          res.status(200).json({ message: 'Post deleted successfully!' });
        });
      } else {
        post.destroy();
        res.status(200).json({ message: 'Post deleted successfully!' });
      }
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

exports.postsLikes = async (req, res, next) => {
    const { id } = req.params;
    const { iduser, like } = req.body;
    try {
      const post = await db.Posts.findOne({ where: { id } });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const usersLiked = post.usersLiked || [];
      const index = usersLiked.indexOf(iduser);
      if (like === 1 && index === -1) {
        post.likes += 1;
        post.usersLiked = usersLiked.concat(iduser);
      } else if (like === -1 && index !== -1) {
        post.likes -= 1;
        post.usersLiked.splice(index, 1);
      } else {
        return res.status(400).json({ message: 'Invalid request' });
      }
      await post.save();
      res.status(200).json({ message: `${like === 1 ? '+1' : '-1'} like` });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
