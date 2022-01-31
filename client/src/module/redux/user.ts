import ApiService from "../ApiService"
import { MRegisterUser, MUser, MUserAction } from 'model/index'
import { RootState } from 'module/redux/index'

// 액션 타입
const LOGIN_USER = 'login_user' as const
const REGISTER_USER = 'register_user' as const
const AUTH_USER = 'auth_user' as const
const LOGOUT_USER = 'logout_user' as const

//액션 생성함수
export const registerUser = (dataToSubmit: MRegisterUser) => {
    const request = ApiService.registerUser(dataToSubmit)
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const loginUser = (dataToSubmit: MRegisterUser) => {
    const request = ApiService.loginUser(dataToSubmit)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const auth = async() => {
    const request = await ApiService.getAuth()

    return {
        type: AUTH_USER,
        payload: request
    }
}

export const logoutUser = () => {
    const request = ApiService.logoutUser()

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// 초기상태 선언
const initialState: MUser = {
    userData: {
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

//리듀서
function user(state: MUser = initialState, action: MUserAction){
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

export default user

export const userSelector = (state: RootState) => {
    return state.user
}