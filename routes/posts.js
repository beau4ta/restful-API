const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//gets all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    } catch {
        res.json({ message: err })
    }
});

//adds posts
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
    const savedPost = await post.save()
   res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }
});

//get one post
router.get('/:postId', async (req, res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post);
    } catch (err) {
        res.json({ message: err })
    }
});

//delete post
router.delete('/:postId', async (req, res) => {
    try{
   const deletePost = await Post.remove({_id})
   res.json(deletePost);
    } catch (err) {
        res.json({ message: err})
    }
})

//update post
router.patch('/:postId', async (req, res) => {
    try{
    const updatePost = Post.updateOne(
        { _id: req.params.postId }, 
        { $set: {title: req.body.title, description: req.body.description}}
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;