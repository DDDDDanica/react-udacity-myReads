/**
 * Created by zhao.shen on 13/09/2017.
 */
import React from 'react';
import { Link } from 'react-router-dom';
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
        let { books, updateBookShelf, getBookShelf } = this.props;
        return (
            <div className="RPM-BookList">
                <div className="RPM-BookList-header">
                    My Reads
                </div>
                
                {shelves.map ((shelf, index)=> {
                    return (
                        <BookShelf key={index}
                                   shelf={shelf.label}
                                   books={books.filter(book => book.shelf === shelf.shelf)}
                                   updateBookShelf={updateBookShelf}
                                   getBookShelf={getBookShelf}
                        />
                    );
                })}
                <Link to="/search" className="RPM-BookList-add">+</Link>
            </div>
        );
    }
}

// Register property
BookList.propTypes = {
    books: PropTypes.array,
    updateBookShelf: PropTypes.func,
    getBookShelf: PropTypes.func
};