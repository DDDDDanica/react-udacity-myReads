import React from 'react';
import Index from '../../src/Index';
import BookAPI from '../../src/utility/BookAPI';
import books from '../utils/books.json';

describe('Index', () => {
    let wrapper, getAllMock;

    beforeEach(() => {
        getAllMock = sinon.stub(BookAPI, 'getAll').returns(new Promise(resolve => {
            resolve(books);
        }));
    });

    afterEach(() => {
        getAllMock.restore();
    });
    
    it('should render loader by default', () => {
        wrapper = mount(<Index />);
        expect(wrapper.find('.RPM-Loader').length).to.equal(1);
    });

    // it('should should call API when render component', () => {
    //     wrapper = mount(<Index />);
    //     console.log(wrapper.debug());
    //
    // });
    // it('should load books from API when renders component');
});