//Taylor Zweigle, 2021
const Song = require("../database/database");

getSongs = async (req, res) => {
    await Song.find({}, (err, songs) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }
        
        if(!songs.length) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: songs });
    }).catch(err => console.log(err));
};

getSongById = async (req, res) => {
    await Song.findOne({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }

        if(!song) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: song });
    }).catch(err => console.log(err));
};

createSong = (req, res) => {
    const body = req.body;

    if(!body) { return res.status(400).json({ success: false, error: err }); }

    const song = new Song(body);

    if(!song) { return res.status(400).json({ success: false, error: err }); }

    song.save()
        .then(() => { return res.status(201).json({ success: true, id: song._id }); })
        .catch(error => { return res.status(400).json({ error }); });
};

updateSong = async (req, res) => {
    const body = req.body;

    if(!body) { return res.status(400).json({ success: false, error: err }); }

    Song.findOne({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(404).json({ err }); }

        if(body.song) { song.song = body.song; }
        if(body.album) { song.artist = body.artist; }
        if(body.album) { song.album = body.album; }
        if(body.genre) { song.genre = body.genre; }
        if(body.tuning) { song.tuning = body.tuning; }
        
        song.completed = body.completed;

        song.save()
            .then(() => { return res.status(200).json({ success: true, id: song._id }); })
            .catch(error => { return res.status(404).json({ error }); });
    });
};

deleteSong = async (req, res) => {
    await Song.findOneAndDelete({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }

        if(!song) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: song });
    }).catch(err => console.log(err));
}

module.exports = { getSongs, getSongById, createSong, updateSong, deleteSong };