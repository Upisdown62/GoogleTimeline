//import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';
//import { USER_SERVER } from '../components/Config.js';
import ApiService from '../module/ApiService'

export function registerUser(dataToSubmit){
    // const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
    //     .then(response => response.data);

    const request = ApiService.registerUser(dataToSubmit)
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    // const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
    //             .then(response => response.data);

    const request = ApiService.loginUser(dataToSubmit)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(data){
    // const request = axios.get(`${USER_SERVER}/auth`)
    // .then(response => response.data);

    const request = ApiService.getAuth()

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    // const request = axios.get(`${USER_SERVER}/logout`)
    // .then(response => response.data);

    const request = ApiService.logoutUser()

    return {
        type: LOGOUT_USER,
        payload: request
    }
}