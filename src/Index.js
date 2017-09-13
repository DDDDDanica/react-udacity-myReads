import React from 'react';
import BookList from './components/BookList/BookList';
import './Index.scss';

export default class MyApp extends React.Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className="RPM-Index">
                <div className="RPM-Index-header">
                    My Reads
                </div>
                <BookList />
            </div>
        );
    }
}
