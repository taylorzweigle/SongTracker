import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/textInput";
import Dropdown from "../components/dropdown";

class FormPage extends Component {
    state = {
        genres: ["Country", "Rock"],
        tunings: ["Standard", "Eb", "Drop D", "Drop Db"]
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>New Song</h3>
                </div>
                <div className="row">
                    <div className="col-xl">
                        <TextInput id="songName" label="Song" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl">
                        <TextInput id="songArtist" label="Artist" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl">
                        <TextInput id="songAlbum" label="Album" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <Dropdown id="songGenre" label="Genre" options={this.state.genres} />
                    </div>
                    <div className="col-xl-6">
                        <Dropdown id="songTuning" label="Tuning" options={this.state.tunings} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-1">
                        <Link to="/songs" className="btn btn-secondary">Cancel</Link>
                    </div>
                    <div className="col-xl">
                        <Link to="/songs" className="btn btn-primary">Create</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default FormPage;