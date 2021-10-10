const express = require("express");
const {getPost, createPost, updatePost, deletePost, likePost} = require("../controllers/posts");

const router = express()

router.get('/', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

module.exports = router

