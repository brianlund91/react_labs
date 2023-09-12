import React from'react';
import { useSelector } from 'react-redux';

const DivPanel = () => {
    let counterVal = useSelector((state) => state.counter);

    return(
        <div>
            The current value of the counter is {counterVal}
        </div>
    );
}

export default DivPanel;