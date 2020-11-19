import * as types from './types';
import axios from 'axios';
import api from '../api'; 
import sha1 from 'sha1'

export const checkAuthStatus = () => {
    console.log('here')
    return dispatch => {
        const authToken = localStorage.getItem('AUTH-TOKEN');
        const userAuthToken = localStorage.getItem('USER-AUTH-TOKEN');
        const user = JSON.parse(localStorage.getItem('user'))

        if(authToken && userAuthToken && user){
            dispatch(successLogin({
                user: user,
                authToken: authToken,
                userAuthToken: userAuthToken,
            }))
            return true;
        }
        return false
    }
}

export const login = (loginData) => {
    return async dispatch => {
        const formData = new FormData();
        for(let key in loginData){
            if(key === 'password') formData.append(key, sha1(loginData[key]))
            else formData.append(key, loginData[key])
        }
        const response = axios.post(api.login, formData);
        let status;
        await response.then(
            response => {
                console.log(response)
                status = response.status;

                //set axios headers
                axios.defaults.headers.common['AUTH-TOKEN'] = response.data['AUTH-TOKEN'];
                axios.defaults.headers.common['USER-AUTH-TOKEN'] = response.data['USER-AUTH-TOKEN'];
                
                //set local storage
                localStorage.setItem('AUTH-TOKEN', response.data['AUTH-TOKEN'])
                localStorage.setItem('USER-AUTH-TOKEN', response.data['USER-AUTH-TOKEN'])
                localStorage.setItem('user', JSON.stringify(response.data.user))

                dispatch(successLogin({
                    user: response.data.user,
                    authToken: response.data['AUTH-TOKEN'],
                    userAuthToken: response.data['USER-AUTH-TOKEN'],
                }))
            }
        ).catch(
            err => {
                status = err.response.status;
                console.log(err)
            }
        )

        return status
    }
}

const successLogin = (data) => {
    return {
        type: types.SET_LOGIN_DATA,
        payload: data
    }
}

export const logout = () => {
    return async dispatch => {
        //delete axios headers
        delete axios.defaults.headers.common["AUTH-TOKEN"];
        delete axios.defaults.headers.common["USER-AUTH-TOKEN"];
        dispatch(successLogout())
        
    }
}

export const successLogout = () => {
    return {
        type: types.LOGOUT,
    }
}