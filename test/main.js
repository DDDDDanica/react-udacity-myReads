import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import 'babel-polyfill';

// Import all test files here
import './cases/Index';

// Global functions for testing.
window.shallow = shallow;
window.expect = expect;
window.mount = mount;
