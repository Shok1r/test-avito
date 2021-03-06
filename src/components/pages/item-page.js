/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadAllNews, commentsDelete} from '../../actions';
import Spinner from '../spinner/spinner'
import Comments from '../comments';
import convertTime from '../../utils';

import './pages.css';

class ItemPage extends Component {

    componentDidMount() {
        if( this.props.newsItems.length === 0){
            this.props.loadAllNews();
        }
    }

    componentWillUnmount()  {
        this.props.commentsDelete();
    }

    render() {

        this.props.commentsDelete();

        const {newsItems, loading} = this.props;

        if (loading) {
            return <Spinner/>
        }

        const item = newsItems.find(el => +el.id === +this.props.match.params.id);

        return (
            <View item={item}/> 
        )
    }
}

const View = ({item}) => {

    const {title, score, by, time, url, descendants} = item;

    let comments = <div className="item__comment-list">No comments yet</div>;

    if (descendants > 0) {
        comments = <Comments pageId={item.id}/>;
    }

    return (
        <>
            <Link className="return-link" to = {`/`}>
                <button className="btn btn-outline-primary">Go back</button>
            </Link>
            <div className = "item_page">
                <div className="item__title-wrapper">
                    <div className="item__title">{title}</div>
                    <a href={url} target="_blank">Link to news</a>
                </div>
                <div className="item__info">
                    <div className="wrapper">
                        <div className="item__author">Author: <span>{by}</span></div>
                        <div className="item__score">Score: <span>{score}</span></div>
                        <div className="item__comments-counter">Comments: <span>{descendants}</span></div>
                    </div>
                    <div className="item__date">Date: <span>{convertTime(time)}</span></div>
                </div>
            </div>
            {comments}
        </>
    ) 
}

const mapStateToProps = (state) => {
    return {
        newsItems: state.news,
        loading: state.newsLoading,
        error: state.newsError
    }
}

const mapDispatchToProps = {
    loadAllNews,
    commentsDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
