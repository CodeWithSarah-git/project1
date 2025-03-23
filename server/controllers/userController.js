
const usertModels = require("../models/userModels");

const createUser = async (req, res) => {
    const { name,username,email ,address,phone} = req.body
    if (!name) {
        return res.status(400).json({ message: 'name is required' })
    }
    const userRout = await usertModels.create({
         title,body
    })
    if (userRout) { 
        return res.status(201).json({ message: 'New user created' })
    } else {
        return res.status(400).json({ message: 'Invalid user ' })
    }
}

const getAllUsers = async (req, res) => {
    const userRout = await userModels.find().lean()
    if (!userRout?.length) {
        return res.status(400).json({ message: 'No user found' })
    }
    res.json(userRout)
}

const updateUser = async (req, res) => {
    const { _id, name,username,email ,address,phone} = req.body
    if (!_id || !name) {
        return res.status(400).json({
            message: 'fields are required'
        })
    }
    const userRout = await userModels.findById(_id).exec()
    if (!userRout) {
        return res.status(400).json({ message: 'user not found' })
    }
    userRout.name = name
    userRout.username = username
    userRout.email = email
    userRout.address = address
    userRout.phone = phone
    const updateUser = await userRout.save()
    res.json(`'${updateUser.name}' updated`)
}
const deleteUser = async (req, res) => {
    const { id } = req.body
    const userRout = await userModels.findById(id).exec()
    if (!userRout) {
        return res.status(400).json({ message: 'user not found' })
    }
    const result = await userRout.deleteOne()
    const reply = `user  deleted`
    res.json(reply)
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}