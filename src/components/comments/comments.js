import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadAllComments } from '../../actions';
import CommentsList from '../comment-list';

import './comments.css';

class Comments extends Component {

    componentDidMount() {
        this.refreshComments();
        this.timerId = setInterval(this.refreshComments, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    refreshComments = () => {
        this.props.loadAllComments(this.props.pageId);
    }

    render() {
        
        const {pageId, commentsItems, loading, error} = this.props;

        if (loading || commentsItems.length < 1) {
            return (
                <div className="item__comment-list">Loading...</div>
            )
        }

        if (error) {
            return (
                <div className="item__comment-list">Something goes wrong</div>
            )
        }

        const commentsId = commentsItems.filter(item => item.parent === pageId).map(item => item.id);

        return (
            <View commentsId={commentsId} refreshComments={this.refreshComments} commentsItems={commentsItems}/>
        )
    }
}

const View = ({commentsId, refreshComments, commentsItems}) => {

    return (
        <div>
            <button 
                onClick={refreshComments}
                className="btn btn-outline-secondary refresh-btn">
                refresh comments
            </button>
            <CommentsList commentsId={commentsId} commentsItems={commentsItems}/>
        </div>
    ) 
}

const mapDispatchToProps = {
    loadAllComments
};

const mapStateToProps = (state) => {
    return {
        loading: state.commentsLoading,
        error: state.commentsError,
        commentsItems: state.comments
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);