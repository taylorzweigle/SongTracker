import React, { Component } from "react";

class TableRow extends Component {
    updateCheckmark() {
        const { completed } = this.props.song;

        let checkmarkClasses = "fa fa-lg ";

        if(completed === true) { checkmarkClasses += "fa-check-circle iconTrue"; }
        else { checkmarkClasses += "fa-circle-o iconFalse"; }

        return checkmarkClasses;
    }

    render() {
        const { song } = this.props;
        const { _id, song: name, artist, album, genre, tuning } = song;

        return (
            <tr key={_id}>
                <td>
                    <i className={this.updateCheckmark()} onClick={() => this.props.onComplete(song)} />
                </td>
                <td>{name}</td>
                <td>{artist}</td>
                <td>{album}</td>
                <td>{genre}</td>
                <td>{tuning}</td>
                <td><i className="fa fa-file-text-o fa-lg"></i></td>
                <td>
                    <i className="fa fa-close fa-sm iconDelete" onClick={() => this.props.onDelete(song)} />
                </td>
            </tr>
        );
    }
};

export default TableRow;