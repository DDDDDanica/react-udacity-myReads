/**
 * Created by zhao.shen on 13/09/2017.
 */
import React from 'react';
import Loader from '../../utility/Loader';
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
    constructor () {
        super();
    }
    

    render () {
        let books = this.props.books;
        return (
            <div className="RPM-BookList">
                {shelves.map ((shelf, index) => {
                    return (
                        <div className="RPM-BookList-category" key={index}>
                            <div className="bookTitle">
                                <svg className="icon">
                                    <use xlinkHref="images/quill.svg#icon"/>
                                </svg>
                                <span className="text">{shelf.label}</span>
                            </div>
                            <div className="bookContent">
                                {books.length > 0 ?
                                    books.map((book, index) => {
                                        if(shelf.shelf === book.shelf) {
                                            return (
                                                <div className="book" key={index}>
                                                    <img src={book.imageLinks.thumbnail} />
                                                    <div className="moveBooks">
                                                        <select>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                    <div className="title">
                                                        {book.subtitle ?
                                                            `${book.title} - ${book.subtitle}`
                                                            : book.title
                                                        }
                                                    </div>
                                                    <div className="author">
                                                        {book.authors.map(author => author)}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                    :
                                    <Loader/>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

// Register property
BookList.propTypes = {
    books: PropTypes.array
};