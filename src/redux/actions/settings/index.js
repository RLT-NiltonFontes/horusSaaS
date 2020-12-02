import * as types from './types';

export const setLanguage = (language) => {
    return {
        type: types.SET_LANGUAGE,
        language: language,
    }
}