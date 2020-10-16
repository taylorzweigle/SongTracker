const Song = require("../database/database");

createSong = (req, res) => {
    const body = req.body;

    if(!body) { return res.status(400).json({ success: false, error: err }); }

    const song = new Song(body);

    if(!song) { return res.status(400).json({ success: false, error: err }); }

    song.save()
        .then(() => { return res.status(201).json({ success: true, id: song._id }); })
        .catch(error => { return res.status(400).json({ error }); });
}

updateSong = async (req, res) => {
    const body = req.body;

    if(!body) { return res.status(400).json({ success: false, error: err }); }

    Song.findOne({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(404).json({ err }); }

        //song.song = body.song;
        //song.artist = body.artist;
        //song.album = body.album;
        //song.genre = body.genre;
        //song.tuning = body.tuning;
        song.completed = body.completed;

        song.save()
            .then(() => { return res.status(200).json({ success: true, id: song._id }); })
            .catch(error => { return res.status(404).json({ error }); });
    });
}

deleteSong = async (req, res) => {
    await Song.findOneAndDelete({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }

        if(!song) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: song });
    }).catch(err => console.log(err));
}

getSongById = async (req, res) => {
    await Song.findOne({ _id: req.params.id }, (err, song) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }

        if(!song) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: song });
    }).catch(err => console.log(err));
}

getSongs = async (req, res) => {
    await Song.find({}, (err, songs) => {
        if(err) { return res.status(400).json({ success: false, error: err }); }
        
        if(!songs.length) { return res.status(404).json({ success: false, error: err }); }

        return res.status(200).json({ success: true, data: songs });
    }).catch(err => console.log(err));
}

module.exports = { createSong, updateSong, deleteSong, getSongById, getSongs };