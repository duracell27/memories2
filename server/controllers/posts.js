
const ObjectId = require('mongoose').Types.ObjectId;
const PostMessage = require('./../models/postMessage')

exports.getPost = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

exports.updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if (!ObjectId.isValid(_id)) return res.status(404).send('Немає такого ід поста')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

    res.json(updatedPost)
}

exports.deletePost = async (req, res) => {
    const { id: _id } = req.params

    if (!ObjectId.isValid(_id)) return res.status(404).send('Немає такого ід поста')
    
    await PostMessage.findByIdAndRemove(_id)
    res.status(200).json({message: 'Пост видалено'})


}

exports.likePost = async (req, res) => {
    const { id: _id } = req.params

    if (!ObjectId.isValid(_id)) return res.status(404).send('Немає такого ід поста')

    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost)
}
