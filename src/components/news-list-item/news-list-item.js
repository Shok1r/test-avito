import React from 'react';
import { Link } from 'react-router-dom';
import convertTime from '../time-converter';

import './news-list-item.css';

const NewsListItem = ({newsItem}) => {

    const {title, score, by, time} = newsItem;

    const date = convertTime(time);

    return (
        <>
            <li className="news__item list-group-item">
                <Link className="item__link" to = {`/${newsItem.id}`}>
                    <div className="item__title">{title}</div>
                </Link>
                <div className="item__info">
                    <div className="wrapper">
                        <div className="item__author">Author: <span>{by}</span></div>
                        <div className="item__score">Score: <span>{score}</span></div>
                    </div>
                    <div className="item__date">Date: <span>{date}</span></div>
                </div>
            </li>
        </>
    )
}


export default NewsListItem;