import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Loader from './utility/Loader';
import BookList from './components/BookList/BookList';
import SearchBook from './components/SearchBook/SearchBook';
import * as BookAPI from './utility/BookAPI';
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
            this.setState({ books, isGetting: false });
        });
    }
    
    // Update book based on the shelf selected
    updateBookShelf (book, shelf) {
        // istanbul ignore next
        BookAPI.update(book, shelf).then(books => {
            this.setState(({ books }) => {
            
                // Check if book was added from
                // the search screen
                const isPresent = books.find(b => (
                    b.id === book.id
                ));
            
                // If book was previously selected
                // find book and only change the shelf
                if (!isPresent) {
                    return {
                        books: books.filter(b =>
                            b.id === book.id ? b.shelf = shelf : b
                        )
                    };
                }
            
                // If books was not previously selected,
                // update shelf and add it to the list
                return {
                    books: books.concat(
                        Object.assign({}, book, { shelf: shelf })
                    )
                };
            });
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
