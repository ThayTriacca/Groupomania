const {Post} = require('../models/posts');
const fs = require('fs');

exports.createpost = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const { idpost, iduser, content, postDate } = JSON.parse(req.body.post);
    const media = req.file ? url + '/images/' + req.file.filename : null;
    try {
        const post = await Post.create({ idpost, iduser, content, media, postDate, likes: 0 });
        res.status(201).json({ message: 'Post saved successfully!', post });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOnepost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ where: { idpost: id } });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.modifypost = async (req, res, next) => {
    const { id } = req.params;
    const { idpost, iduser, content, postDate, likes } = JSON.parse(req.body.post);
    const media = req.file ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename : req.body.post.media;
    try {
        const post = await Post.findOne({ where: { idpost: id } });
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

exports.deletepost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ where: { idpost: id } });
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

exports.getAllposts = async (req, res, next) => {
    console.log("dentro do getallpost")
    try {
        const posts = await Post.findAll();
        console.log(Post);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

exports.postLikes = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(post => {
            const includesId = post.usersLiked.includes(req.body.iduser);
            if (req.body.like === 1 && !includesId) {
                post.update({ $push: { usersLiked: req.body.iduser }, $inc: { likes: 1 } })
                    .then(() => res.status(200).json({ message: '+1 Like' }))
                    .catch(error => res.status(400).json({ error }));
            } else if (req.body.like === -1 && includesId) {
                post.update({ $pull: { usersLiked: req.body.iduser }, $inc: { likes: -1 } })
                    .then(() => res.status(200).json({ message: '-1 Like' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(400).json({ error: 'Invalid request' });
            }
        })
        .catch(error => res.status(400).json({ error }));
};

