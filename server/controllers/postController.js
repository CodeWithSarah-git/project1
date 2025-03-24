
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
    const { title, body } = req.body;
    const { id } = req.params; 
    
    if (!id || !title) {
        return res.status(400).json({ message: 'fields are required' });
    }
    try {
        const postRout = await postModels.findById(id);
        if (!postRout) {
            return res.status(404).json({ message: 'post not found' });
        }
        postRout.title = title;
        postRout.body = body;
        await postRout.save();
        res.json({ message: `'${postRout.title}' updated successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params; 
    try {
        const postRout = await postModels.findById(id);
        if (!postRout) {
            return res.status(404).json({ message: 'post not found' });
        }
        await postRout.deleteOne();
        res.json({ message: `Post '${postRout.title}' deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}