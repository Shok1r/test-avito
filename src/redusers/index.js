const initialState = {
    news: [],
    loading: true,
    error: false,
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
        default:
            return state;
    }
}

export default reduser;