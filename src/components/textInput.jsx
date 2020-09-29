import React, { Component } from "react";

class TextInput extends Component {
    render() {
        const { id, label } = this.props;

        return (
            <React.Fragment>
                <label for={id}>{label}</label>
                <input type="text" className="form-control" id={id} />
            </React.Fragment>
        );
    }
};

export default TextInput;