/**
 * Created by zhao.shen on 15/09/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

const actions = [
    { action : 'Currently Reading', value : 'currentlyReading' },
    { action : 'Want to Read', value : 'wantToRead' },
    { action : 'Read', value : 'read' },
    { action : 'None', value : 'none' },
];

export default class Book extends React.Component {
    constructor () {
        super ();
        this.handleMoveBook = this.handleMoveBook.bind(this);
    }
    
    handleMoveBook (e) {
        e.preventDefault();
        this.props.updateBookShelf(this.props.book, e.target.value);
    }
    
    render () {
        const { book, getBookShelf } = this.props;
        const imageURL = book.imageLinks.thumbnail;
        const shelf = getBookShelf(book.id);
        return (
            <div>
                <img src={imageURL} />
                <div className="moveBooks">
                    <select defaultValue={shelf} onChange={this.handleMoveBook}>
                        <option value="none" disabled>Move to...</option>
                        {actions.map((action, index) => (
                            <option key={index} value={action.value}>{action.action}</option>
                        ))}
                    </select>
                </div>
                <div className="title">
                    {book.subtitle ?
                        `${book.title} - ${book.subtitle}`
                        : book.title
                    }
                </div>
                <div className="author">
                    {book.authors && book.authors.map(author => author)}
                </div>
            </div>
        );
    }
}

// Register property
Book.propTypes = {
    book: PropTypes.object,
    updateBookShelf: PropTypes.func,
    getBookShelf: PropTypes.func
};