import { songs } from "../services/songsDatabase";

export function getSongs() { return songs; }

export function getSong(id) { return songs.find(song => song._id === id); }

export function saveSong(song) {
    let songInDB = songs.find(s => s._id === song._id) || {  };

    songInDB.song = song.song;
    songInDB.artist = song.artist;
    songInDB.album = song.album;
    songInDB.genre = song.genre;
    songInDB.tuning = song.tuning;
    songInDB.completed = false;

    if(!songInDB._id) {
        songInDB._id = songs.length + 1;
        songs.push(songInDB);
    }

    return songInDB;
}

export function deleteSong(id) {
    let songInDB = songs.find(song => song._id === id);

    songs.splice(songs.indexOf(songInDB), 1);
    
    return songInDB;
}