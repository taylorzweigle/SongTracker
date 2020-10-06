import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/textInput";
import Dropdown from "../components/dropdown";
import { saveSong } from "../services/songs";

class FormPage extends Component {
    state = {
        genres: ["Country", "Rock"],
        tunings: ["Standard", "Drop D", "Eb", "Drop Db"],
        data: {
            song: "",
            artist: "",
            album: "",
            genre: "",
            tuning: "",
            completed: ""
        },
    }

    handleChange = (e) => {
        const data = {...this.state.data};

        data[e.currentTarget.name] = e.currentTarget.value;
        
        this.setState({ data });
    };

    handleSubmit = () => {
        saveSong(this.state.data);

        this.props.history.push("/songs");
    };

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <h3>New Song</h3>
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
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default FormPage;