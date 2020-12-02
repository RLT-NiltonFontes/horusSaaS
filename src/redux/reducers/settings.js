import * as types from '../actions/settings/types';

const initState = {
    languages:[
        {
            id: 'pt',
            name: 'Português',
            variant: 'Portugal'
        },
        {
            id: 'en',
            name: 'English',
            variant: ''
        }
    ],
    language: 'pt',
}

const reducer = (state = initState, action) => {
    console.log('settings', action.language)
    switch(action.type){
        case types.SET_LANGUAGE: 
            localStorage.setItem('language', action.language)
            return {...state, language: action.language}
        default:
            return state;
    }
}

export default reducer;