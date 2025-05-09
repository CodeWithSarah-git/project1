const express = require("express");
const router = express.Router();
const postModels = require("../models/postModels");
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

router.post("/", postController.createPost);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
