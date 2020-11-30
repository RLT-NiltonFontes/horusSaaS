import * as types from '../actions/tickets/types';

const initState = {
    ticketsList: [],
    ticketData: {}
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case types.UPDATE_LIST: 
            return {...state, ticketsList: action.payload}
        case types.UPDATE_TICKET: 
            return {...state, ticketData: action.payload}
        case types.UPDATE_COMMENTS:
            return {...state, ticketData: {...state.ticketData, comments: action.payload}}
        case types.UPDATE_FILES:
            return {...state, ticketData: {...state.ticketData, files: action.payload}}
        default:
            return state;
    }
}

export default reducer;