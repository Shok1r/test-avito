import React from 'react';
import Comment from '../comment-list-item';

import './comment-list.css';

const CommentsList = ({commentsId, commentsItems}) => {
    
    const items = commentsId.map(item => {
        return(<Comment commentId={item} key={item} commentsItems={commentsItems}/>)
    });

    return (
        <ul className="comments__list list-group">
            {items}
        </ul>
    )
}

export default CommentsList;
