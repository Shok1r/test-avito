const initialState = {
    news: [],
    comments: [],
    loading: true,
    error: false,
    commentsLoading: true,
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWS_LOADED':
            return {
                ...state,
                news: action.payload,
                loading: false
            };
        case 'NEWS_REQUESTED':
            return {
                ...state,
                loading: true,
            };
        case 'NEWS_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'COMMENTS_LOADED':
            return {
                ...state,
                comments: action.payload,
                commentsLoading: false
            };
        case 'COMMENTS_REQUESTED':
            return {
                ...state,
                commentsLoading: true,
            };    
        case 'COMMENTS_DELETE':
            return {
                ...state,
                comments: []
            };
        default:
            return state;
    }
}

export default reduser;