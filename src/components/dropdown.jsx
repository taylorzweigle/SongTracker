import React, { Component } from "react";

class Dropdown extends Component {
    render() {
        const { id, name, label, options, value, onChange } = this.props;

        return (
            <React.Fragment>
                <label htmlFor={id}>{label}</label>
                <select
                    className="custom-select"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <option defaultValue></option>
                    {options.map(option =>
                        <option key={option} value={option}>{option}</option>
                    )}
                </select>
            </React.Fragment>
        );
    }
};

export default Dropdown;