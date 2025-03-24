const User = require("../models/userModels"); // טעינה נכונה של המודל

const createUser = async (req, res) => {
    
    try {
        const { name, username, email, address, phone } = req.body;
        
        if (!name || !username || !email) {
            return res.status(400).json({ message: "Name, username, and email are required" });
        }

        const newUser = await User.create({ name, username, email, address, phone });

        return res.status(201).json({ message: "New user created", user: newUser });

    } catch (error) {
        console.error("❌ Error creating user:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        if (!users.length) {
            return res.status(400).json({ message: "No users found" });
        }
        res.json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { _id, name, username, email, address, phone } = req.body;

        if (!_id || !name) {
            return res.status(400).json({ message: "ID and Name are required" });
        }

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.username = username;
        user.email = email;
        user.address = address;
        user.phone = phone;

        await user.save();

        res.json({ message: `'${user.name}' updated`, user });

    } catch (error) {
        console.error("❌ Error updating user:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.json({ message: "User deleted" });

    } catch (error) {
        console.error("❌ Error deleting user:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
