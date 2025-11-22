const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  title: String,
  description: String,
  techStack: [String],
  github: String,
  likes: { type: Number, default: 0 },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
