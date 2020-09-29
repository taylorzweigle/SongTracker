import React, { Component } from "react";

class Dropdown extends Component {
    render() {
        const { id, label, options } = this.props;

        return (
            <React.Fragment>
                <label for={id}>{label}</label>
                <select class="custom-select" id={id}>
                    <option selected></option>
                    {options.map(option =>
                        <option value={option}>{option}</option>
                    )}
                </select>
            </React.Fragment>
        );
    }
};

export default Dropdown;