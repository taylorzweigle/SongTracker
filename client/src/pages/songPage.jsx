import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Search from "../components/search";
import FilterBar from "../components/filterBar";
import TableHeader from "../components/tableHeader";
import TableRow from "../components/tableRow";
import Count from "../components/count";

class SongPage extends Component {
    state = {
        songs: [],
        tunings: ["Standard", "Drop D", "Eb", "Drop Db"],
        searchQuery: "",
        selectedTuning: "All"
    };

    componentDidMount() {
        this.getSongs();
    }

    async getSongs() {
        await api.getSongs().then(songs => {
            this.setState({ songs: songs.data.data });
        });
    }

    async updateSong(song, completed) {
        await api.updateSong(song._id, { "completed": completed });

        this.getSongs();
    }

    async deleteSong(song) {
        await api.deleteSong(song._id);

        this.getSongs();
    }

    getPageData = () => {
        let { songs, searchQuery, selectedTuning } = this.state,
            filteredSongs = songs,
            totalCount = 0,
            completedCount = 0,
            toDoCount = 0;

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

        for(let s of songs) {
            if(s.completed) {
                completedCount++;
            }
        }

        totalCount = songs.length;
        toDoCount = totalCount - completedCount;

        return { songs: filteredSongs, totalCount, completedCount, toDoCount };
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };

    handleTuning = (tuning) => {
        this.setState({ selectedTuning: tuning });
    };

    handleComplete = async (song) => {
        let completed;

        await api.getSongById(song._id).then(song => {
            completed = !song.data.data.completed;
        });
        
        this.updateSong(song, completed);
    };

    handleDelete = (song) => {
        this.deleteSong(song);
    };

    render() {
        const { searchQuery, tunings } = this.state;
        const { songs, totalCount, completedCount, toDoCount } = this.getPageData();

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-xl">
                            <Search value={searchQuery} onChange={this.handleSearch} />
                        </div>
                        <div className="col-xl-4">
                            <FilterBar options={tunings} onOptionSelect={this.handleTuning} />
                        </div>
                        <div className="col-xl-2">
                            <Link to="/song" className="btn btn-primary">Add Song</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="overflow-auto overflow-row">
                            <table className="table table-sm table-hover">
                                <TableHeader />
                                <tbody>
                                    {songs.map(song => 
                                        <TableRow
                                            key={song._id}
                                            song={song}
                                            onComplete={this.handleComplete}
                                            onDelete={this.handleDelete} />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="countRow" className="row">
                        <div id="countCell" className="col-xl">
                            <Count type="Total" count={totalCount} />
                        </div>
                        <div id="countCell" className="col-xl">
                            <Count type="Learned" count={completedCount} />
                        </div>
                        <div id="countCell" className="col-xl">
                            <Count type="To Do" count={toDoCount} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default SongPage;