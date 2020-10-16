const mongoose = require("mongoose");

const db = mongoose.connection;
const Schema = mongoose.Schema;

const DATABASE = "songsDatabase";
const COLLECTION = "songs";

mongoose.connect(`mongodb://127.0.0.1:27017/${DATABASE}`, { useNewUrlParser: true })
    .catch(e => { console.error("Connection error", e.message); });

const Song = new Schema(
    {
        song: { type: String, required: true },
        artist: { type: String, required: true },
        album: { type: String, required: true },
        genre: { type: String, required: true },
        tuning: { type: String, required: true },
        completed: { type: Boolean, required: true }
    }
);

module.exports = db;
module.exports = mongoose.model(COLLECTION, Song);