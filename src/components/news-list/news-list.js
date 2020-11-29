import React from 'react';
import NewsListItem from '../news-list-item';
import Spinner from '../spinner/spinner'

import './news-list.css';

const NewsList = ({newsItems, loading, refreshNewsList}) => {

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

export default NewsList;