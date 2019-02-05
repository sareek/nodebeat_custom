import React from 'react';

import './PostTest.css'

const post= ( props ) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div className ='Info'>
              <div className='Author'>{props.author}</div>
            </div>
        </div>
    )
};

export default post;