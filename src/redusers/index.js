const initialState = {
    news: [],
    newsLoading: true,
    newsError: false,
    
    comments: [],
    commentsLoading: true,
    commentsError: false
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NEWS_SUCCESS':
            return {
                ...state,
                news: action.payload,
                newsLoading: false
            };
        case 'GET_NEWS_REQUEST':
            return {
                ...state,
                newsLoading: true,
            };
        case 'GET_NEWS_FAILURE':
            return {
                ...state,
                newsLoading: false,
                newsError: true
            };
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.payload,
                commentsLoading: false
            };
        case 'GET_COMMENTS_REQUEST':
            return {
                ...state,
                commentsLoading: true,
            };
        case 'GET_COMMENTS_FAILURE':
            return {
                ...state,
                commentsLoading: false,
                commentsError: true
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