/**
 * Created by zhao.shen on 13/09/2017.
 */
import React from 'react';
import BookShelf from '../BookShelf/BookShelf';
import PropTypes from 'prop-types';
import './BookList.scss';

const shelves = [
    {
        shelf: 'currentlyReading',
        label: 'Current Reading'
    }, {
        shelf: 'wantToRead',
        label: 'Want to Read'
    }, {
        shelf: 'read',
        label: 'Read'
    }];

export default class BookList extends React.Component {
    render () {
        let { books, updateBookShelf } = this.props;
        return (
            <div className="RPM-BookList">
                {shelves.map ((shelf, index)=> {
                    return (
                        <BookShelf key={index}
                                   shelf={shelf}
                                   books={books.filter(book => book.shelf === shelf.shelf)}
                                   updateBookShelf={updateBookShelf}
                        />
                    );
                })}
            </div>
        );
    }
}

// Register property
BookList.propTypes = {
    books: PropTypes.array,
    updateBookShelf: PropTypes.func
};