//Taylor Zweigle, 2021
import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import TextInput from "../components/textInput";
import Dropdown from "../components/dropdown";

class EditSongPage extends Component {
    state = {
        genres: ["Country", "Rock"],
        tunings: ["Standard", "Drop D", "Eb", "Drop Db"],
        data: {
            _id: "",
            song: "",
            artist: "",
            album: "",
            genre: "",
            tuning: "",
            completed: ""
        },
    };

    componentDidMount() {
        this.getSong(this.props.match.params.id);
    }

    async getSong(id) {
        await api.getSongById(id).then(song => {
            const { _id, song: name, artist, album, genre, tuning, completed } = song.data.data;

            const data = {
                "_id" : _id ? _id : "null",
                "song": name ? name : "null",
                "artist": artist ? artist : "null",
                "album": album ? album : "null",
                "genre": genre ? genre : "null",
                "tuning": tuning ? tuning : "null",
                "completed": completed ? completed : false
            };

            this.setState({ data });
        });
    }

    handleChange = (e) => {
        const data = {...this.state.data};

        data[e.currentTarget.name] = e.currentTarget.value;
        
        this.setState({ data });
    };

    handleSubmit = async (e) => {
        this.editSong();

        this.props.history.push("/songs");
    };

    async editSong() {
        const { song, artist, album, genre, tuning, completed } = this.state.data;

        await api.updateSong(this.state.data._id, {
            "song": song,
            "artist": artist,
            "album": album,
            "genre": genre,
            "tuning": tuning,
            "completed": completed
        });
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <h3>Edit Song</h3>
                    </div>
                    <div className="row">
                        <div className="col-xl">
                            <TextInput
                                id="songName"
                                name="song"
                                label="Song"
                                value={data.song}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl">
                            <TextInput
                                id="songArtist"
                                name="artist"
                                label="Artist"
                                value={data.artist}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl">
                            <TextInput
                                id="songAlbum"
                                name="album"
                                label="Album"
                                value={data.album}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <Dropdown
                                id="songGenre"
                                name="genre"
                                label="Genre"
                                value={data.genre}
                                options={this.state.genres}
                                onChange={this.handleChange} />
                        </div>
                        <div className="col-xl-6">
                            <Dropdown
                                id="songTuning"
                                name="tuning"
                                label="Tuning"
                                value={data.tuning}
                                options={this.state.tunings}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-1">
                            <Link to="/songs" className="btn btn-secondary">Cancel</Link>
                        </div>
                        <div className="col-xl">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default EditSongPage;