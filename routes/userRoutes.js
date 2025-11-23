const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/signup", auth, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, email, name });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/login", auth, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, email, name });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
