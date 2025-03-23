const express = require("express");
const router = express.Router();
const postModels = require("../models/postModels");
const postController = require("../controllers/postController");

// קבלת כל הפוסטים
router.get("/", postController.getAllPosts);

// יצירת פוסט חדש
router.post("/", postController.createPost);

// עדכון פוסט לפי ID
router.put("/:id", postController.updatePost);

// מחיקת פוסט לפי ID
router.delete("/:id", postController.deletePost);

module.exports = router;
