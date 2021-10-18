const express = require("express");
const {getPost, createPost, updatePost, deletePost, likePost, getPostBySearch} = require("../controllers/posts");
const auth = require('../middleware/auth.js')
const router = express()

router.get('/', getPost)
router.get('/search', getPostBySearch)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

module.exports = router

