export default class NewsService {
    urlStories = 'https://hacker-news.firebaseio.com/v0/newstories.json';

    getNewsItems = async () => {
        //Получение id последних новостей
        const response = await fetch(this.urlStories);
        if (!response.ok){
            throw new Error('Server Error');
        }
        const result = await response.json();


        //Получение массива объектов новостей из 100 последних новостей 
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

    getAllComments = async (pageId) => {

        const pageKids = await fetch(`https://hacker-news.firebaseio.com/v0/item/${pageId}.json?print=pretty`)
                                    .then(r => r.json())
                                    .then(item => {return item.kids})
        
        const res = await fetchRecursiveComments(pageKids);
        const commentsArray = createCommentsArray(res);

        return commentsArray;
    }

}

//Да-да это рекурсивный запрос комментов
async function fetchRecursiveComments(arr) {

    const result = [];

    if (Array.isArray(arr)) {
        for (const id of arr) {
            try {
                result.push({
                    result: await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                                        .then(res => res.json())
                });
            } catch(error) {
                result.push({ result: error });
            }
        }

        for (const item of result) {
            if (item.result.hasOwnProperty('kids')) {
                item.result.ItemsOfKids = [...await fetchRecursiveComments( item.result.kids)];
            }
        }
    }
  
    return result;
}

//Преобразование дерева комментариев в человеческий вид
function createCommentsArray(array) {
    const ArrayOfComments = [];
    createElements(array);
         
    function createElements(arrayOfItems) {
        for (const item of arrayOfItems) {

            const {result} = item;

            if (result.hasOwnProperty('kids')) {
                ArrayOfComments.push(
                    {
                        id: result.id, 
                        author: result.by, 
                        parent: result.parent,
                        kids: result.kids, 
                        text: result.text,
                        time: result.time
                    }
                )
                createElements(result.ItemsOfKids)
            } else {
                ArrayOfComments.push(
                    {
                        id: result.id, 
                        author: result.by, 
                        parent: result.parent, 
                        text: result.text,
                        time: result.time
                    })
            }
        }
    }

    return ArrayOfComments;
}
