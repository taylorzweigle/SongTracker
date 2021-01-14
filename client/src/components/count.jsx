//Taylor Zweigle, 2021
import React from "react";

const Count = (props) => {
    const { type, count, selected, onSelectCount } = props;

    const updateBadgeSpan = () => {
        let spanClasses = "badge badge-";

        if(type === "Total") { spanClasses += "primary" }
        else if(type === "Completed") { spanClasses += "success" }
        else if(type === "To Do") { spanClasses += "warning" }

        return spanClasses;
    };

    return (
        <div className={`count-cell${selected ? "-selected" : ""}`} onClick={() => onSelectCount(type)}>
            <h5>{type} Songs: <span className={updateBadgeSpan()}>{count}</span></h5>
        </div>
    );
};

export default Count;