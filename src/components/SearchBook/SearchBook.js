/**
 * Created by zhao.shen on 15/09/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from '../BookShelf/BookShelf';
import Loader from '../../utility/Loader';
import * as BookAPI from '../../utility/BookAPI';
import './SearchBook.scss';

export default class SearchBook extends React.Component {
    constructor () {
        super();
        this.state = ({
            query: '',
            results: [],
            isSearching: false
        });
        
        this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
    }
    
    // Take user's input value and make changes to query state
    handleUpdateQuery (e) {
        e.preventDefault();
        let query = e.target.value.trim();
        this.setState({
            query: query,
            isSearching: true
        }, () => {
            if (query.length > 0) {
                BookAPI.search(query, 30)
                    .then(books => {
                        if (Array.isArray(books)) {
                            this.setState({
                                results: books,
                                isSearching: false
                            });
                        } else {
                            this.setState({
                                results: [],
                                isSearching: false
                            });
                        }
                    });
            } else {
                this.setState({
                    results: [],
                    isSearching: false
                });
            }
        });
    }
    
    
    render () {
        const { query, results, isSearching } = this.state;
        
        return (
            <div className="RPM-Search">
                <div className="searchArea">
                    <Link to="/">
                        <svg className="icon">
                            <use xlinkHref="images/back.svg#icon"/>
                        </svg>
                    </Link>
                    <input type="text"
                           placeholder="Search a book by title or author"
                           value={query}
                           onChange={this.handleUpdateQuery}
                    />
                </div>
                
                <div className="searchResults">
                    {isSearching ?
                        <Loader />
                        : results.length > 0 ?
                            <div>
                                <BookShelf books={results}
                                           shelf="Search Results..."
                                           updateBookShelf={this.props.updateBookShelf}
                                />
                            </div>
                            :
                            <div className="error">
                                <svg className="monsterIcon">
                                    <use xlinkHref="images/error.svg#icon"/>
                                </svg>
                                <div className="hint">
                                    Oops, there is no result matching your search.
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

// Register property
SearchBook.propTypes = {
    books: PropTypes.array,
    updateBookShelf: PropTypes.func
};