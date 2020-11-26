import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import NewsService from './services/news-service';
import NewsServiceContext from './components/news-service-context';
import store from './store';

const newsService = new NewsService();

ReactDOM.render(
  <Provider store = {store}>
        <ErrorBoundry>
            <NewsServiceContext.Provider value = {newsService}>
                <Router>
                    <App/>
                </Router>
            </NewsServiceContext.Provider>
        </ErrorBoundry>
    </Provider>
  , document.getElementById('root')
);

