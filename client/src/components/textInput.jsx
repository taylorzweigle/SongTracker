//Taylor Zweigle, 2021
import React, { Component } from "react";

class TextInput extends Component {
    render() {
        const { id, name, label, value, onChange } = this.props;

        return (
            <React.Fragment>
                <label htmlFor={id}>{label}</label>
                <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange} />
            </React.Fragment>
        );
    }
};

export default TextInput;