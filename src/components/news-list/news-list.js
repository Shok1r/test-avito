import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewsListItem from '../news-list-item';
import { loadAllNews } from '../../actions';
import Spinner from '../spinner/spinner'

import './news-list.css';

class NewsList extends Component {

    componentDidMount() {
        this.refreshNewsList();
        this.timerId = setInterval(this.refreshNewsList, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    refreshNewsList = () => {
        this.props.loadAllNews();
    }


    render() {
        const {newsItems, loading} = this.props;

        if (loading || newsItems.length < 1) {
            return <Spinner/>
        }

        const items = newsItems.map(newsItem => {
            return (
                <NewsListItem 
                    key = {newsItem.id} 
                    newsItem = {newsItem}
                />
            )
        })

        return (
            <View items = {items} refreshNewsList={this.refreshNewsList}/> 
        )
    }
};

const View = ({items, refreshNewsList}) => {

    return (
        <div className="news__wrapper">
            <div className="news__header">
                <h1>Last 100 news</h1>
                <button 
                    onClick={refreshNewsList}
                    className="btn btn-outline-primary">
                    refresh
                </button>
            </div>
            <ul className="news__list list-group">
                {items}
            </ul>
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        newsItems: state.news,
        loading: state.newsLoading
    }
};

const mapDispatchToProps = {
    loadAllNews
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);