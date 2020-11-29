import NewsSrvices from '../services/news-service';

const newsService = new NewsSrvices();

const loadAllNews = () => {
    return dispatch => {
        dispatch(newsRequested());

        newsService.getNewsItems()
            .then(res => {dispatch(newsLoaded(res))})
            .catch(error => {dispatch(newsError())});
    }
}

const newsLoaded = (newMenu) => {
    return {
        type: 'GET_NEWS_SUCCESS',
        payload: newMenu
    };
};

const newsRequested = () => {
    return {
        type: 'GET_NEWS_REQUEST'
    };
};

const newsError = () => {
    return {
        type: 'GET_NEWS_FAILURE',
    }
}

const loadAllComments = (pageId) => {
    return dispatch => {
        dispatch(commentsRequested());

        newsService.getAllComments(pageId)
            .then(res => {dispatch(commentsLoaded(res))})
            .catch(error => {dispatch(commentsError())});
    }
}

const commentsLoaded = (comments) => {
    return {
        type: 'GET_COMMENTS_SUCCESS',
        payload: comments
    };
}

const commentsRequested = () => {
    return {
        type: 'GET_COMMENTS_REQUEST'
    };
};

const commentsError = () => {
    return {
        type: 'GET_COMMENTS_FAILURE'
    };
}

const commentsDelete = () => {
    return {
        type: 'COMMENTS_DELETE'
    };
}

export {
    loadAllNews,
    loadAllComments,
    commentsDelete,
};