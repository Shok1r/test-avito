const newsLoaded = (newMenu) => {
    return {
        type: 'NEWS_LOADED',
        payload: newMenu
    };
};

const newsRequested = () => {
    return {
        type: 'NEWS_REQUESTED'
    };
};

const newsError = () => {
    return {
        type: 'NEWS_ERROR',
    }
}

const commentsLoaded = (comments) => {
    return {
        type: 'COMMENTS_LOADED',
        payload: comments
    };
}

const commentsRequested = () => {
    return {
        type: 'COMMENTS_REQUESTED'
    };
};

const commentsDelete = () => {
    return {
        type: 'COMMENTS_DELETE'
    };
}

export {
    newsLoaded,
    newsRequested,
    newsError,
    commentsLoaded,
    commentsDelete,
    commentsRequested
};