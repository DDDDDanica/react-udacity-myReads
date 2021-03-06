/**
 * Created by zhao.shen on 15/09/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import './BookShelf.scss';

export default class BookShelf extends React.Component {
    render () {
        const { shelf, books, updateBookShelf, getBookShelf } = this.props;
        return (
            <div className="RPM-BookList-category">
                <div className="shelfTitle">
                    <svg className="icon">
                        <use xlinkHref="images/quill.svg#icon"/>
                    </svg>
                    <span className="text">{shelf}</span>
                </div>
                {books.length > 0 ?
                    <div className="shelfContent">
                        {books.map((book, index) => {
                            return (
                                <div key={index} className="book">
                                    <Book book={book}
                                          updateBookShelf={updateBookShelf}
                                          getBookShelf={getBookShelf}/>
                                </div>
                            );
                        })}
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

// Register property
BookShelf.propTypes = {
    shelf: PropTypes.string,
    books: PropTypes.array,
    updateBookShelf: PropTypes.func,
    getBookShelf: PropTypes.func
};