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


export {
    newsLoaded,
    newsRequested,
    newsError,
};