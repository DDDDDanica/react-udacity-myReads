const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export default {
    get(bookId) {
        return fetch(`${api}/books/${bookId}`, {headers})
            .then(res => res.json())
            .then(data => data.book);
    },
    
    getAll () {
        return fetch(`${api}/books`, {headers})
            .then(res => res.json())
            .then(data => data.books);
    },
    
    update(book, shelf) {
        return fetch(`${api}/books/${book.id}`, {
            method: 'PUT',
            headers: Object.assign({}, headers, {
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({shelf})
        }).then(res => res.json());
    },
    
    search (query, maxResults) {
        return fetch(`${api}/search`, {
            method: 'POST',
            headers: Object.assign({}, headers, {
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({query, maxResults})
        }).then(res => res.json())
            .then(data => data.books);
    }
};