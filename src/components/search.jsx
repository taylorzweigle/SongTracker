import React, { Component } from "react";

class Search extends Component {
    render() {
        const { value, onChange } = this.props;

        return (
            <input
                type="text"
                className="form-control"
                id="searchBox"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)} />
        );
    }
};

export default Search;