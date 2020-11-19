import * as types from '../actions/tickets/types';

const initState = {
    ticketsList: [],
    ticketData: {}
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case types.UPDATE_LIST: 
            return {...state, ticketsList: action.payload}
        case types.UPDATE_ONE: 
            return {...state, ticketData: action.payload}
        default:
            return state;
    }
}

export default reducer;