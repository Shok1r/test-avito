import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CommentsList from '../comment-list';
// import convertTime from '../time-converter';

class Comment extends Component {

    state = {
        showChilds: false,
    }

    render() {

        const {commentsItems, commentId} = this.props;
        const item = commentsItems.find(el => el.id === commentId)

        if (commentsItems.length === 0) {
            return <></>;
        }

        return (
            <CommentWithoutKids item={item}/>
        )

        // if (item.hasOwnProperty('kids')) {
        //     return (
        //         <CommentWithoutKids item={item}/>
        //     )
        // } else {
        //     return (
        //         <CommentWithoutKids item={item}/>
        //     )
        // }
    }
}

const CommentWithoutKids = ({item}) => {

    const {by, text, time} = item;

    return (
        <li className="list-group-item">
            <div>{by}</div>
            <div dangerouslySetInnerHTML={{ __html: text }}/>
            <div>{time}</div>
        </li>
    )
}

const mapStateToProps = (state) => {
    return {
        commentsItems: state.comments
    }
};

export default connect(mapStateToProps)(Comment);
