import * as types from '../actions/auth/types';
import axios from 'axios';

const initState = {
    authToken: null,
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case types.SET_LOGIN_DATA: 
            return action.payload
        case types.UPDATE_LOGIN_DATA: 
            return {...state, ...action.payload}
        case types.LOGOUT:
            localStorage.clear()
            return initState
        default:
            return state;
    }
}

export default reducer;