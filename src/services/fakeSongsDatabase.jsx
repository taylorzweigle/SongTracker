const songs = [
    { _id: "1", song: "Loud and Heavy", artist: "Cody Jinks", album: "Adobe Sessions", genre:"Country", tuning: "Drop Db", completed: false },
    { _id: "2", song: "Break Up in the End", artist: "Cole Swindell", album: "All of It", genre:"Country", tuning: "Eb", completed: false },
    { _id: "3", song: "Talladega", artist: "Eric Church", album: "The Outsiders", genre:"Country", tuning: "Standard", completed: false },
    { _id: "4", song: "Rearview Town", artist: "Jason Aldean", album: "Rearview Town", genre:"Country", tuning: "Drop Db", completed: true },
    { _id: "5", song: "They Don't Know", artist: "Jason Aldean", album: "They Don't Know", genre:"Country", tuning: "Drop Db", completed: false },
    { _id: "6", song: "Beer Never Broke My Heart", artist: "Luke Combs", album: "What You See is What You Get", genre:"Country", tuning: "Drob Db", completed: true },
    { _id: "7", song: "When It Rains It Pours", artist: "Luke Combs", album: "This One's For You", genre:"Country", tuning: "Eb", completed: false },
    { _id: "8", song: "Up Down", artist: "Morgan Wallen", album: "If I Know Me", genre:"Country", tuning: "Eb", completed: false },
    { _id: "9", song: "Whiskey Glasses", artist: "Morgan Wallen", album: "If I Know Me", genre:"Country", tuning: "Eb", completed: false }
];

export function getSongs() { return songs; }

export function getSong(id) { return songs.find(song => song._id === id); }

export function saveSong(song) {
    let songInDB = songs.find(s => s._id === song._id) || {  };

    songInDB.song = song.song;
    songInDB.artist = song.artist;
    songInDB.album = song.album;
    songInDB.genre = song.genre;
    songInDB.tuning = song.tuning;
    songInDB.completed = song.completed;

    if(!songInDB._id) {
        songInDB._id = "10"
        songs.push(songInDB);
    }

    return songInDB;
}

export function deleteSong(id) {
    let songInDB = songs.find(song => song._id === id);

    songs.splice(songs.indexOf(songInDB), 1);
    
    return songInDB;
}