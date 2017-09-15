import React from 'react';
import skipFrame from '../utils/skipFrame';
import Index from '../../src/Index';
import BookAPI from '../../src/utility/BookAPI';
import books from '../utils/books.json';

describe('Index', () => {
    let wrapper, fetchMock, getAllMock;
    
    beforeEach(() => {
        // fetchMock = sinon.stub(window, 'fetch');

        // getAllMock = sinon.stub(BookAPI, 'getAll').returns(new Promise(resolve => {
        //
        // }));
    });

    afterEach(() => {
        // fetchMock.restore();
    });
    
    it('should render header by default', () => {
        wrapper = mount(<Index />);
        expect(wrapper.find('.RPM-Index-header').length).to.equal(1);
    });
    
    it('should should call API when render component', async () => {
        wrapper = mount(<Index />);
        await skipFrame();
        // console.log(wrapper.debug());
        
    });
    it('should load books from API when renders component');
});