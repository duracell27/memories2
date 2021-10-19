const express = require("express");
const {getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch, getPost} = require("../controllers/posts");
const auth = require('../middleware/auth.js')
const router = express()

router.get('/', getPosts)
router.get('/search', getPostBySearch)
router.get('/:id', getPost)

router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

module.exports = router

