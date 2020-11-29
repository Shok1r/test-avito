import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadAllNews } from '../../actions';
import NewsList from '../news-list';

class NewsListContainer extends Component {
    componentDidMount() {
        this.refreshNewsList();
        this.timerId = setInterval(this.refreshNewsList, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    refreshNewsList = () => {
        this.props.loadAllNews();
    }

    render() {

        const {newsItems, loading} = this.props;

        return (
            <NewsList 
                newsItems={newsItems} 
                loading={loading} 
                refreshNewsList={this.refreshNewsList}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newsItems: state.news,
        loading: state.newsLoading
    }
}

const mapDispatchToProps = {
    loadAllNews
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsListContainer);
