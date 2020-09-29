import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSongs } from "../services/fakeSongsDatabase";
import Search from "../components/search";
import TableHeader from "../components/tableHeader";
import TableRow from "../components/tableRow";
import Count from "../components/count";

class SongPage extends Component {
    state = {
        songs: [],
        searchQuery: ""
    };

    componentDidMount() {
        this.setState({ songs: getSongs() });
    }

    getPageData = () => {
        let { songs, searchQuery } = this.state,
            filteredSongs = songs,
            totalCount = 0,
            completedCount = 0,
            toDoCount = 0;

        if(searchQuery) {
            filteredSongs = songs.filter((s) => s.song.toLowerCase().startsWith(searchQuery.toLowerCase()));
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
        const { searchQuery } = this.state;
        const { songs, totalCount, completedCount, toDoCount } = this.getPageData();

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-xl">
                            <Search value={searchQuery} onChange={this.handleSearch} />
                        </div>
                        <div className="col-xl-2">
                            <Link to="/newSong" className="btn btn-primary">Add Song</Link>
                        </div>
                    </div>
                    <div className="row">
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