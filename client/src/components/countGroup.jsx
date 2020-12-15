import React from "react";

import Count from "./count";

const CountGroup = (props) => {
    const { counts, onSelectCount } = props;

    return (
        <div id="countRow" className="row">
            {counts.map(count =>
                <div key={count["Name"]} className="col-xl">
                    <Count
                        type={count["Name"]}
                        count={count["Count"]}
                        selected={count["Selected"]}
                        onSelectCount={onSelectCount} />
                </div>
            )}
        </div>
    );
};

export default CountGroup;