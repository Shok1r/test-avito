import {createStore} from 'redux';
import reducer from './redusers';

const store = createStore(reducer);

export default store;