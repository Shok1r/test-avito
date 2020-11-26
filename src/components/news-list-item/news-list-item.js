import React from 'react';
import { Link } from 'react-router-dom';

import './news-list-item.css';

const NewsListItem = ({newsItem}) => {

    const {title, score, by, time} = newsItem;

    const date = convertTime(time);

    return (
        <>
            <li className="news__item list-group-item">
                <Link className="news__link" to = {`/${newsItem.id}`}>
                    <div className="news__title">{title}</div>
                </Link>
                <div className="news__info">
                    <div className="wrapper">
                        <div className="news__author">Author: <span>{by}</span></div>
                        <div className="news__score">Score: <span>{score}</span></div>
                    </div>
                    <div className="news__date">Date: <span>{date}</span></div>
                </div>
            </li>
        </>
    )
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function convertTime(unix_time) {
    const date = new Date(unix_time*1000);
    const converted = {
        day: getZero(date.getDate()),
        mounth: getZero(date.getMonth() + 1),
        year: date.getFullYear(),
        hours: getZero(date.getHours()),
        minutes: getZero(date.getMinutes())
    }

    return `${converted.day}.${converted.mounth}.${converted.year} ${converted.hours}:${converted.minutes}`;
}


export default NewsListItem;