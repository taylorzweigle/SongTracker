//Taylor Zweigle, 2021
import React, { Component } from "react";

class TableHeader extends Component {
    render() {
        return (
            <thead className="thead-dark">
                <tr>
                    <th className="table-header-cell" scope="col">&nbsp;</th>
                    <th className="table-header-cell" scope="col">&nbsp;</th>
                    <th className="table-header-cell" scope="col">Song</th>
                    <th className="table-header-cell" scope="col">Artist</th>
                    <th className="table-header-cell" scope="col">Album</th>
                    <th className="table-header-cell" scope="col">Genre</th>
                    <th className="table-header-cell" scope="col">Tuning</th>
                    <th className="table-header-cell" scope="col">&nbsp;</th>
                    <th className="table-header-cell" scope="col">&nbsp;</th>
                </tr>
            </thead>
        );
    }
};

export default TableHeader;