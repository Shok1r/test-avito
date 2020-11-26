import React from 'react';

import './spinner.css';

const Spinner = () => {
    return (
        <div className="loader">
            <div className="l_main">
                <div className="l_square"><span></span><span></span><span></span></div>
                <div className="l_square"><span></span><span></span><span></span></div>
                <div className="l_square"><span></span><span></span><span></span></div>
                <div className="l_square"><span></span><span></span><span></span></div>
            </div>
        </div>  
    )
}

export default Spinner;