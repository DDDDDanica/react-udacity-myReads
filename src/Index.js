import React from 'react';
import BookList from './components/BookList/BookList';
import * as BookAPI from './utility/BookAPI';
import './Index.scss';

export default class MyApp extends React.Component {
    constructor () {
        super();
        this.state = {
            books: []
        };
        this.updateBookShelf = this.updateBookShelf.bind(this);
    }
    
    componentDidMount () {
        this.fetchAllBooks();
    }
    
    // Fetch all the books and allocate them to suitable shelves
    fetchAllBooks () {
        BookAPI.getAll().then(books => {
            this.setState({ books });
        });
    }
    
    // Update book based on the shelf selected
    updateBookShelf (book, shelf)  {
        BookAPI.update(book ,shelf).then(()=>{
            this.fetchAllBooks();
        });
    }
    
    render () {
        return (
            <div className="RPM-Index">
                <div className="RPM-Index-header">
                    My Reads
                </div>
                <BookList books={this.state.books} updateBookShelf={this.updateBookShelf}/>
            </div>
        );
    }
}
