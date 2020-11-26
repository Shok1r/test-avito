import React from 'react';
import NewsServiceContext from '../news-service-context';

const WithNewsService = () => (Wrapped) => { 
    return (props) => {  
        return (
            <NewsServiceContext.Consumer>
                {
                    (NewsService) => {
                        return <Wrapped {...props} NewsService = {NewsService}/>
                    }
                }
            </NewsServiceContext.Consumer>
        )
    }
};

export default WithNewsService;