import {combineReducers} from 'redux';

import tickets from './tickets'
import auth from './auth'

const reducers = {
    'tickets': tickets,
    'auth': auth,
}

export default(combineReducers(reducers))