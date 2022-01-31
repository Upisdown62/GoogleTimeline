import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types';
 
const initialState = {
    userData:{
        isAuth: false,
        error: false,
        _id: '',
        isAdmin: false,
        email: '',
        name: '',
        role: 0,
        image: ''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }
}