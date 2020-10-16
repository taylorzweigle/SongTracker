import React, { Component } from "react";

class TableHeader extends Component {
    render() {
        return (
            <thead className="thead-light">
                <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">Song</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Album</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Tuning</th>
                    <th scope="col">Sheet Music</th>
                    <th scope="col">&nbsp;</th>
                </tr>
            </thead>
        );
    }
};

export default TableHeader;