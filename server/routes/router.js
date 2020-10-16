const express = require("express");
const Songs = require("../controllers/songs");

const router = express.Router();

router.post("/song", Songs.createSong);
router.put("/song/:id", Songs.updateSong);
router.delete("/song/:id", Songs.deleteSong);
router.get("/song/:id", Songs.getSongById);
router.get("/songs", Songs.getSongs);

module.exports = router;