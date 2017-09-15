/**
 * Created by zhao.shen on 15/09/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import Loader from '../../utility/Loader';
import './BookShelf.scss';

export default class BookShelf extends React.Component {
    render () {
        const { shelf, books, updateBookShelf } = this.props;
        return (
            <div className="RPM-BookList-category">
                <div className="shelfTitle">
                    <svg className="icon">
                        <use xlinkHref="images/quill.svg#icon"/>
                    </svg>
                    <span className="text">{shelf.label}</span>
                </div>
                <div className="shelfContent">
                    {books.length > 0 ?
                        books.map((book, index) => {
                            return (
                                <div key={index} className="book">
                                    <Book book={book} updateBookShelf={updateBookShelf}/>
                                </div>
                            );
                        })
                        :
                        <Loader/>
                    }
                </div>
            </div>
        );
    }
}

// Register property
BookShelf.propTypes = {
    shelf: PropTypes.object,
    books: PropTypes.array,
    updateBookShelf: PropTypes.func
};