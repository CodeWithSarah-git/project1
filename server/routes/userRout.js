const express = require("express");
const router = express.Router();
const userModels = require("../models/userModels");
const userController = require("../controllers/userController");

// קבלת כל המשתמשים
router.get("/", userController.getAllUsers);

// יצירת משתמש חדש
router.post("/", userController.createUser);

// עדכון פרטי משתמש לפי ID
router.put("/:id", userController.updateUser);

// מחיקת משתמש לפי ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
