/**
 * Created by zhao.shen on 15/09/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from '../BookShelf/BookShelf';
import Loader from '../../utility/Loader';
import BookAPI from '../../utility/BookAPI';
import _ from 'lodash';
import './SearchBook.scss';

export default class SearchBook extends React.Component {
    constructor () {
        super();
        this.state = ({
            query: '',
            results: [],
            isSearching: false,
            error: false
        });
        
        this.handleUpdateQuery = _.throttle(this.handleUpdateQuery.bind(this), 100);
    }
    
    // Take user's input value and make changes to query state
    handleUpdateQuery (e) {
        e.persist();
        let query = e.target.value.trim();
    
        let searchBooks =
          BookAPI.search(query, 30)
          .then(books => {
              if (Array.isArray(books)) {
                  this.setState({
                      results: books,
                      isSearching: false
                  });
              } else {
                  this.setState({
                      isSearching: false,
                      error: true
                  });
              }
          });
        
        this.setState({
            query: query,
            isSearching: true
        }, () => {
            if (query.length > 0) {
                searchBooks;
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
                    <svg className="icon" onClick={this.props.onBackClick}>
                        <use xlinkHref="images/back.svg#icon"/>
                    </svg>
                    
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
                            <BookShelf books={results}
                                       shelf="Search Results..."
                                       updateBookShelf={this.props.updateBookShelf}
                                       getBookShelf={this.props.getBookShelf}
                            />
                            :
                            <div className="error">
                                <svg className="monsterIcon">
                                    <use xlinkHref="images/error.svg#icon"/>
                                </svg>
                                <div className="hint">
                                    {!this.state.error?
                                        'Start your first search here... '
                                        : 'Oops, there is no result matching your search :('
                                    }
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
    updateBookShelf: PropTypes.func,
    getBookShelf: PropTypes.func,
    onBackClick: PropTypes.func
};