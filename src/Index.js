import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import BookList from './components/BookList/BookList';
import SearchBook from './components/SearchBook/SearchBook';
import * as BookAPI from './utility/BookAPI';
import './Index.scss';

export default class Index extends React.Component {
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
        console.log(book);
        BookAPI.update(book ,shelf).then(()=>{
            this.fetchAllBooks();
        });
    }
    
    render () {
        let books = this.state;
        return (
            <div className="RPM-Index">
                <HashRouter>
                    <div>
                        <Route exact path="/" render={() => (
                            <BookList books={books} updateBookShelf={this.updateBookShelf}/>
                        )}/>
                        <Route exact path="/search" render={({history}) => (
                            <SearchBook
                                books={books}
                                updateBookShelf={() => {
                                    this.updateBookShelf();
                                    history.push('/');
                                }}
                            />
                            )}
                        />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
