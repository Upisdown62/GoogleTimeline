import ApiService from "../ApiService"
import { MProgress, MProgressAction } from 'model/index'
import { RootState } from 'module/redux/index'

// 액션 타입
const LOADING_ON = 'loading_on'
const LOADING_OFF = 'loading_off'

//액션 생성함수
export function loadingOn(){
    return {
        type: LOADING_ON
    }
}

export function loadingOff(){
    return {
        type: LOADING_OFF
    }
}

// 초기상태 선언
const initialState: MProgress = {
    loading: false
}

//리듀서
export default function(state = initialState, action: MProgressAction){
    switch(action.type){
        case LOADING_ON:
            return {...state, loading: true}
        case LOADING_OFF:
            return {...state, loading: false}
        default:
            return state;
    }
}

export const progressSelector = (state: RootState) => {
    return state.progress
}