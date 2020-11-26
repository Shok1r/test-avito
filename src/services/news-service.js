export default class NewsService {
    url = 'https://hacker-news.firebaseio.com/v0/newstories.json';

    getNewsItems = async () => {
        //Получения id последних новостей
        const response = await fetch(this.url);
        if (!response.ok){
            throw new Error('Server Error');
        }
        const result = await response.json();


        //Получения массива объектов 100 последних новостей
        const obj = Promise
            .all((result.slice(0, 100)).map( item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
            .then( responses => responses.map(response => response.json()))
            .then( results =>  
                Promise.all(results)
                    .then( response => {return response}))
            .catch( error => {
                throw new Error('Server Error');
            });
    
        
        return await obj;
    }

}