//Taylor Zweigle, 2021
import React, { Component } from "react";

class FilterBar extends Component {
    state = {
        options: []
    };

    componentDidMount() {
        let { options } = this.props;

        options.unshift("All");

        this.setState({ options });
    }

    render() {
        const { options } = this.state;
        const { onOptionSelect } = this.props;

        return (
            <div className="btn-group" role="group">
                {options.map(option => 
                    <button
                        key={option}
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => onOptionSelect(option)}
                    >{option}</button>
                )}
            </div>
        );
    }
};

export default FilterBar;