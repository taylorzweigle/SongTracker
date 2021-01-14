//Taylor Zweigle, 2021
import React, { Component } from "react";

class TableRow extends Component {
    updateCheckmark() {
        const { completed } = this.props.song;

        let checkmarkClasses = "fa fa-lg pl-1 ";

        if(completed === true) { checkmarkClasses += "fa-check-circle icon-green"; }
        else { checkmarkClasses += "fa-circle-o icon-white"; }

        return checkmarkClasses;
    }

    render() {
        const { song, onComplete, onEdit, onDelete } = this.props;
        const { _id, song: name, artist, album, genre, tuning } = song;

        return (
            <tr key={_id}>
                <td>
                    <i className={this.updateCheckmark()} onClick={() => onComplete(song)} />
                </td>
                <td>
                    <i className="fa fa-file-text-o fa-lg icon-white icon-blue-hover" />
                </td>
                <td className="table-row-emphasis">{name}</td>
                <td className="table-row-mute">{artist}</td>
                <td className="table-row-mute">{album}</td>
                <td className="table-row-mute">{genre}</td>
                <td className="table-row-mute">{tuning}</td>
                <td>
                    <i
                        className="fa fa-pencil fa-lg icon-white icon-yellow-hover"
                        onClick={() => onEdit(song)} />
                </td>
                <td>
                    <i
                        className="fa fa-close fa-lg icon-white icon-red-hover"
                        onClick={() => onDelete(song)} />
                </td>
            </tr>
        );
    }
};

export default TableRow;