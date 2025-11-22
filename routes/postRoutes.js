const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/post");
const router = express.Router();

/* ------------------------ CREATE POST ------------------------ */
router.post("/create", auth, async (req, res) => {
  try {
    const { title, description, techStack, github } = req.body;

    const newPost = await Post.create({
      uid: req.user.uid,
      title,
      description,
      techStack,
      github,
    });

    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------ GET ALL POSTS ------------------------ */
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------ LIKE POST ------------------------ */
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error liking post" });
  }
});

/* ------------------------ COMMENT ON POST ------------------------ */
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const { comment } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

/* ------------------------ UPDATE POST ------------------------ */
router.put("/update/:id", auth, async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating post" });
  }
});

/* ------------------------ DELETE POST ------------------------ */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
