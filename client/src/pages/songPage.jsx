import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import api from "../api/api";
import Search from "../components/search";
import FilterBar from "../components/filterBar";
import TableHeader from "../components/tableHeader";
import TableRow from "../components/tableRow";
import CountGroup from "../components/countGroup";

class SongPage extends Component {
    state = {
        songs: [],
        tunings: ["Standard", "Drop D", "Eb", "Drop Db"],
        searchQuery: "",
        selectedTuning: "All",
        selectedCountType: "Total",
    };

    componentDidMount() {
        this.getSongs();
    }

    async getSongs() {
        await api.getSongs().then(songs => {
            this.setState({ songs: songs.data.data });
        });
    }

    async completeSong(song, completed) {
        await api.updateSong(song._id, { "completed": completed });

        this.getSongs();
    }

    async editSong(song) {
        this.props.history.push(`/song/${song._id}`);
    }

    async deleteSong(song) {
        await api.deleteSong(song._id);

        this.getSongs();
    }

    getPageData = () => {
        let { songs, searchQuery, selectedTuning, selectedCountType } = this.state;
        let filteredSongs = songs;
        let counts = {};
        let totalCount = 0;
        let completedCount = 0;
        let toDoCount = 0;
        let selectedCount = [true, false, false];

        if(searchQuery) {
            filteredSongs = songs.filter((s) => 
                s.song.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                s.artist.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                s.album.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        else if(selectedTuning !== "All") {
            filteredSongs = songs.filter((s) => s.tuning === selectedTuning);
        }
        else if(selectedCountType !== "Total") {
            if(selectedCountType === "Completed") {
                filteredSongs = songs.filter((s) => s.completed === true);
            }
            else if(selectedCountType === "To Do") {
                filteredSongs = songs.filter((s) => s.completed === false);
            }
        }

        let sortedSongs = _.orderBy(_.orderBy(filteredSongs, "song", "asc"), "artist", "asc");

        for(let s of songs) {
            if(s.completed) { completedCount++; }
        }

        totalCount = songs.length;
        toDoCount = totalCount - completedCount;

        for(let i = 0; i < selectedCount.length; i++) { selectedCount[i] = false; }

        if(selectedCountType === "Total") { selectedCount[0] = true; }
        if(selectedCountType === "Completed") { selectedCount[1] = true; }
        if(selectedCountType === "To Do") { selectedCount[2] = true; }

        counts = [
            { "Name": "Total", "Count": totalCount, "Selected": selectedCount[0] },
            { "Name": "Completed", "Count": completedCount, "Selected": selectedCount[1] },
            { "Name": "To Do", "Count": toDoCount, "Selected": selectedCount[2] }
        ];

        return { songs: sortedSongs, counts };
    };

    //Handle Filters
    handleSearchFilter = (query) => { this.setState({ searchQuery: query }); };

    handleTuningFilter = (tuning) => { this.setState({ selectedTuning: tuning }); };

    handleCountFilter = (type) => { this.setState({ selectedCountType: type }); };

    handleComplete = async (song) => {
        let completed;

        await api.getSongById(song._id).then(song => {
            completed = !song.data.data.completed;
        });
        
        this.completeSong(song, completed);
    };

    handleEdit = async (song) => { this.editSong(song) };

    handleDelete = (song) => { this.deleteSong(song); };

    render() {
        const { searchQuery, tunings } = this.state;
        const { songs, counts } = this.getPageData();

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-xl">
                            <Search value={searchQuery} onChange={this.handleSearchFilter} />
                        </div>
                        <div className="col-xl-4">
                            <FilterBar options={tunings} onOptionSelect={this.handleTuningFilter} />
                        </div>
                        <div className="col-xl-2">
                            <Link to="/song" className="btn btn-primary">
                                <span style={{ paddingRight: "0.5em" }}>
                                    <i className="fa fa-plus fa-sm icon-white" />
                                </span>
                                <span>Add Song</span>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="overflow-auto overflow-row">
                            <table className="table table-dark table-sm table-hover">
                                <TableHeader />
                                <tbody>
                                    {songs.map(song => 
                                        <TableRow
                                            key={song._id}
                                            song={song}
                                            onComplete={this.handleComplete}
                                            onEdit={this.handleEdit}
                                            onDelete={this.handleDelete} />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <CountGroup counts={counts} onSelectCount={this.handleCountFilter} />
                </div>
            </React.Fragment>
        );
    }
};

export default SongPage;