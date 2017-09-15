import React from 'react';
import BookList from './components/BookList/BookList';
import * as BookApi from './utility/BookAPI';
import './Index.scss';

export default class MyApp extends React.Component {
    constructor () {
        super();
        this.state = {
            books: []
        };
    }
    
    componentDidMount () {
        // Fetch all the books and allocate them to suitable shelves
        BookApi.getAll().then(books => {
            this.setState({books});
        });
    }
    
    render () {
        return (
            <div className="RPM-Index">
                <div className="RPM-Index-header">
                    My Reads
                </div>
                <BookList books={this.state.books}/>
            </div>
        );
    }
}
