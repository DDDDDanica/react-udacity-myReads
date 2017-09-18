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
    }
    
    componentDidMount () {
        this.fetchAllBooks();
    }
    
    // Fetch all the books and allocate them to suitable shelves
    fetchAllBooks () {
        BookAPI.getAll().then(books => {
            console.log(books);
            this.setState({ books, isGetting: false });
        });
    }
    
    // Update book based on the shelf selected
    updateBookShelf (book, shelf) {
        BookAPI.update(book, shelf)
            .then(shelfData => {
                console.log(shelfData);
                // // Check if book is added from the search list
                // let bookStatus = books.find(b => b.id === book.id);
                //
                // bookStatus ?
                //     // If book is in the user's selection, only change the shelf
                //     this.setState({
                //         books: books.filter(b =>b.id === book.id ? b.shelf = shelf : b)
                //     })
                //     :
                //     // If book is not in the user's list, add the book to list and update shelf status
                //     this.setState({
                //         books: books.concat(Object.assign({}, book, { shelf: shelf })
                //         )
                //     });
            });
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
                                <BookList books={books} updateBookShelf={this.updateBookShelf}/>
                            )}/>
                            <Route exact path="/search" render={({history}) => (
                                <SearchBook
                                    books={books}
                                    updateBookShelf={this.updateBookShelf}
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
