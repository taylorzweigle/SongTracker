//Taylor Zweigle, 2021
const express = require("express");

const Songs = require("../controllers/songs");

const router = express.Router();

router.get("/songs", Songs.getSongs);
router.get("/song/:id", Songs.getSongById);
router.post("/song", Songs.createSong);
router.put("/song/:id", Songs.updateSong);
router.delete("/song/:id", Songs.deleteSong);

module.exports = router;