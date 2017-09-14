/**
 * Created by zhao.shen on 13/09/2017.
 */
import React from 'react';
import * as BookApi from '../../utility/BookAPI';
import './BookList.scss';

export default class BookList extends React.Component {
    constructor () {
        super();
    }
    
    componentDidMount () {
        // Fetch all the books and allocate them to suitable shelves
        BookApi.getAll().then(books => {
            console.log(books);
        })
    }
    render () {
        return (
            <div className="RPM-BookList">
                <div className="RPM-BookList-category">
                    <span className="bookTitle">Current Reading</span>
                    <div className="bookContent">
                        <div className="book">
                            <img src="http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
                            <div className="moveBooks">
                                <select>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            <div className="title">Book Name</div>
                            <div className="author">Author</div>
                        </div>
                    </div>
                </div>
                <div className="RPM-BookList-category">
                    <span className="bookTitle">Want to Read</span>
                </div>
                <div className="RPM-BookList-category">
                    <span className="bookTitle">Read</span>
                </div>
            </div>
        );
    }
}