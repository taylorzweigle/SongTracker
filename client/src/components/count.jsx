import React, { Component } from "react";

class Count extends Component {
    updateSpan() {
        const { type } = this.props;

        let spanClasses = "badge badge-";

        if(type === "Total") { spanClasses += "primary" }
        else if(type === "Learned") { spanClasses += "success" }
        else if(type === "To Do") { spanClasses += "warning" }

        return spanClasses;
    }

    render() {
        const { type, count } = this.props;

        return (
            <h5>{type} Songs: <span className={this.updateSpan()}>{count}</span></h5>
        );
    }
};

export default Count;