import React, { Component } from 'react';
import Comment from '../comment-list-item';
import { commentsLoaded, commentsRequested } from '../../actions';
import WithNewsService from '../hoc';
import {connect} from 'react-redux';

import './comment-list.css';

class CommentsList extends Component {

    componentDidMount() {
        const {NewsService, itemsId, commentsRequested} = this.props;

        commentsRequested();
        NewsService.getComments(itemsId)
            .then(res => this.props.commentsLoaded(res))
            .catch(error => console.log(error))
    }
    
    render() {

        const {itemsId, loading} = this.props;

        if (loading) {
            return <div className="item__comment-list">Loading...</div>
        } 

        
        const items = itemsId.map(item => {return(<Comment commentId={item} key={item}/>)});

        return (
            <ul className="comments__list list-group">
                {items}
            </ul>
        )
    
    }
        
}

const mapDispatchToProps = {
    commentsLoaded,
    commentsRequested
};

const mapStateToProps = (state) => {
    return {
        loading: state.commentsLoading
    }
};

export default WithNewsService()(connect(mapStateToProps, mapDispatchToProps)(CommentsList));
