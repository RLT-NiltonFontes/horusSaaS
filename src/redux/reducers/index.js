import {combineReducers} from 'redux';

import settings from './settings';
import tickets from './tickets';
import auth from './auth';

const reducers = {
    'tickets': tickets,
    'auth': auth,
    'settings': settings
}

export default(combineReducers(reducers))