import React from 'react';
import Index from '../../src/Index';
import BookAPI from '../../src/utility/BookAPI';
import skipFrame from '../utils/skipFrame';
import books from '../utils/books.json';

describe('Index', () => {
    let wrapper, getAllMock;

    beforeEach(() => {
        getAllMock = sinon.stub(BookAPI, 'getAll').returns(new Promise(resolve => {
            resolve(books);
        }));
    });

    afterEach(() => {
        wrapper.unmount();
        getAllMock.restore();
    });
    
    it('should render loader by default', () => {
        wrapper = mount(<Index />);
        expect(wrapper.find('.RPM-Loader').length).to.equal(1);
    });

    it('should should call API when render component', async () => {
        wrapper = mount(<Index />);
        await skipFrame();
        expect(wrapper.find('.RPM-Loader').length).to.equal(0);
        expect(getAllMock.callCount).to.equal(1);
    });
    
    it('should load books from API when renders component', async () => {
        wrapper = mount(<Index />);
        expect(wrapper.state('books')).to.deep.equal([]);
        await skipFrame();
        expect(wrapper.state('books')).to.equal(books);
    });
});