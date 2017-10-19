import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Loader from './utility/Loader';
import BookList from './components/BookList/BookList';
import SearchBook from './components/SearchBook/SearchBook';
import BookAPI from './utility/BookAPI';
import './Index.scss';

export default class Index extends React.Component {
    constructor () {
        super();
        this.state = {
            books: [],
            isGetting: true
        };
        this.updateBookShelf = this.updateBookShelf.bind(this);
        this.getBookShelf = this.getBookShelf.bind(this);
    }
    
    componentDidMount () {
        this.fetchAllBooks();
    }
    
    // Fetch all the books and allocate them to suitable shelves
    fetchAllBooks () {
        BookAPI.getAll().then(books => {
            this.setState({ books, isGetting: false });
        });
    }
    
    // Update book based on the shelf selected
    updateBookShelf (newBook, shelf) {
        BookAPI.update(newBook, shelf)
            .then(() => {
                // shelfData returns shelf with id so not used
                let books = this.state.books;
                // Check if book is added from the search list
                let bookStatus = books.find(book => book.id === newBook.id);

                bookStatus ?
                    // If the new book is in the user's selection, only change the shelf
                    this.setState({
                        books: books.filter(book => book.id === newBook.id ? book.shelf = shelf : book)
                    })
                    :
                    // If the new book is not in the user's list, add the book to list and update shelf status
                    this.setState({
                        books: books.concat(Object.assign(
                          {}, newBook, { shelf: shelf }
                        ))
                    });
            });
    }
    
    getBookShelf (id) {
        let books = this.state.books;
        let book = books.find(book => { return book.id === id; });
        if (book) {
            return book.shelf;
        } else {
            return 'none';
        }
    }
    
    render () {
        let { books, isGetting } = this.state;
        return (
            <div className="RPM-Index">
                {isGetting ?
                    <Loader /> :
                    <HashRouter>
                        <div>
                            <Route exact path="/" render={() => (
                                <BookList books={books} updateBookShelf={this.updateBookShelf} getBookShelf={this.getBookShelf}/>
                            )}/>
                            <Route exact path="/search" render={({history}) => (
                                <SearchBook
                                    books={books}
                                    updateBookShelf={this.updateBookShelf}
                                    getBookShelf={this.getBookShelf}
                                    onBackClick={() => {
                                        this.fetchAllBooks();
                                        history.push('/');
                                    }}
                                />
                            )}
                            />
                        </div>
                    </HashRouter>
                }
            </div>
        );
    }
}
