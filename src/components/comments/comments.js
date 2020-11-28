import React, { Component } from 'react';
import {connect} from 'react-redux';
import { commentsLoaded, commentsRequested } from '../../actions';
import WithNewsService from '../hoc';
import CommentsList from '../comment-list';

import './comments.css';

class Comments extends Component {

    state = {
        error: false
    }

    componentDidMount() {
        this.refreshComments();
        this.timerId = setInterval(this.refreshComments, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    refreshComments = () => {
        const {NewsService, pageId, commentsRequested} = this.props;

        commentsRequested();
        NewsService.getAllComments(pageId)
            .then(res => this.props.commentsLoaded(res))
            .catch(error => this.onError())
    }

    onError = () => {
        this.setState({error: true})
    }

    render() {
        
        const {pageId, commentsItems, loading} = this.props;

        if (loading || commentsItems.length < 1) {
            return (
                <div className="item__comment-list">Loading...</div>
            )
        }

        if (this.state.error) {
            return (
                <div className="item__comment-list">Something goes wrong</div>
            )
        }

        const commentsId = commentsItems.filter(item => item.parent === pageId).map(item => item.id);

        return (
            <View commentsId={commentsId} refreshComments={this.refreshComments}/>
        )
    }
}

const View = ({commentsId, refreshComments}) => {

    return (
        <div>
            <button 
                onClick={refreshComments}
                className="btn btn-outline-secondary refresh-btn">
                refresh comments
            </button>
            <CommentsList commentsId={commentsId}/>
        </div>
    ) 
}

const mapDispatchToProps = {
    commentsLoaded,
    commentsRequested
};

const mapStateToProps = (state) => {
    return {
        loading: state.commentsLoading,
        commentsItems: state.comments
    }
};

export default WithNewsService()(connect(mapStateToProps, mapDispatchToProps)(Comments));