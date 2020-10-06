import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSongs } from "../services/songs";
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
        this.setState({ songs: getSongs() });
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

    handleComplete = (song) => {
        let { songs } = this.state;

        songs = [...songs];
        const index = songs.indexOf(song);
        songs[index] = {...songs[index]};
        songs[index].completed = !songs[index].completed;

        this.setState({ songs });
    };

    handleDelete = (song) => {
        let { songs } = this.state;

        songs = songs.filter(s => s._id !== song._id);

        this.setState({ songs });
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
                            <Link to="/newSong" className="btn btn-primary">Add Song</Link>
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