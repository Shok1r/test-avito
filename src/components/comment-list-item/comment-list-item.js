import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommentsList from '../comment-list';
import convertTime from '../../utils/time-converter';

import './comment-list-item.css';

class Comment extends Component {

    state = {
        showChilds: false,
    }

    onToggleShowChilds = () => {
        const {showChilds} = this.state;
        this.setState({showChilds: !showChilds});
    }

    render() {

        const {commentsItems, commentId} = this.props;
        const item = commentsItems.find(el => el.id === commentId)

        if (item.hasOwnProperty('kids')) {
            if (this.state.showChilds) {

                const child = <CommentsList commentsId={item.kids}/>
                return (
                    <CommentWithKids item={item} child={child} onShowChildren={() => this.onToggleShowChilds()}/> 
                )
            } else {
                return (
                    <CommentWithKidsHide item={item} onShowChildren={() => this.onToggleShowChilds()}/>
                )
            }
        } else {
            return (
                <CommentWithoutKids item={item}/>
            )
        }
    }
}

const CommentWithoutKids = ({item}) => {

    const {author, text, time} = item;

    return (
        <li className="list-group-item comment">
            <div className="comment__author">author: {author}</div>
            <div className="comment__text" dangerouslySetInnerHTML={{ __html: text }}/>
            <div className="comment__date">{convertTime(time)}</div>
        </li>
    )
}

const CommentWithKidsHide = ({item, onShowChildren}) => {
    const {author, text, time, kids} = item;

    const quantity = `[${kids.length} more]`;

    return (
        <li className="list-group-item comment">
            <div className="comment__title">
                <div className="comment__author">author: {author}</div>
                <div 
                    className="comment__show-children"
                    onClick={onShowChildren}>
                    {quantity}
                </div>
            </div>
            <div className="comment__text" dangerouslySetInnerHTML={{ __html: text }}/>
            <div className="comment__date">{convertTime(time)}</div>
        </li>
    )
}

const CommentWithKids = ({item, child, onShowChildren}) => {
    const {author, text, time} = item;

    return (
        <li className="list-group-item comment">
            <div className="comment__title">
                <div className="comment__author">author: {author}</div>
                <div 
                    className="comment__show-children"
                    onClick={onShowChildren}>
                    [-]
                </div>
            </div>
            <div className="comment__text" dangerouslySetInnerHTML={{ __html: text }}/>
            <div className="comment__date">{convertTime(time)}</div>
            {child}
        </li>
    )
}

const mapStateToProps = (state) => {
    return {
        commentsItems: state.comments
    }
};

export default connect(mapStateToProps)(Comment);
