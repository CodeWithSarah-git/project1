
const postModels = require("../models/postModels");

const createPost = async (req, res) => {
    const { title,body } = req.body
    if (!title) {
        return res.status(400).json({ message: 'title is required' })
    }
    const postRout = await postModels.create({
         title,body
    })
    if (postRout) { 
        return res.status(201).json({ message: 'New post created' })
    } else {
        return res.status(400).json({ message: 'Invalid post ' })
    }
}

const getAllPosts = async (req, res) => {
    const postRout = await postModels.find().lean()
    if (!postRout?.length) {
        return res.status(400).json({ message: 'No post found' })
    }
    res.json(postRout)
}

const updatePost = async (req, res) => {
    const { _id, title,body} = req.body
    if (!_id || !title) {
        return res.status(400).json({
            message: 'fields are required'
        })
    }
    const postRout = await postModels.findById(_id).exec()
    if (!postRout) {
        return res.status(400).json({ message: 'post not found' })
    }
    postRout.title = title
    postRout.body = body
    const updatePost = await postRout.save()
    res.json(`'${updatePost.title}' updated`)
}
const deletePost = async (req, res) => {
    const { id } = req.body
    const postRout = await postModels.findById(id).exec()
    if (!postRout) {
        return res.status(400).json({ message: 'post not found' })
    }
    const result = await postRout.deleteOne()
    const reply = `post  deleted`
    res.json(reply)
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}