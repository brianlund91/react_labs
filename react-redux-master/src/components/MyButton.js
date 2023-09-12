import React from 'react'
import { useDispatch } from 'react-redux'
import increment from '../action'

const MyButton = () => {
    let dispatch = useDispatch(); 

    return (
        <div>
            <button onClick={() => dispatch(increment(1))}>Increase Counter by 1</button>
        </div>
    );
}

export default MyButton;