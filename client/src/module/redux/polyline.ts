import { MPolyline, MPolylineAction, MResPolyline } from 'model/index'
import { RootState } from 'module/redux/index'

// 액션 타입
const LOAD_POLYLINE = 'load_polyline'

//액션 생성함수  
export const loadPolyline = async(input: MResPolyline[]) => {        
    const request = input//await ApiService.loadPolyline(inputDate, body)
    return {
        type: LOAD_POLYLINE,
        payload: request
    }
}

// 초기상태 선언
const initialState: MPolyline = {
    polyline: []
}

//리듀서
export default function(state = initialState, action: MPolylineAction){
    switch(action.type){
        case LOAD_POLYLINE:
            return {...state, polyline: action.payload}
        default:
            return state;
    }
}

export const polylineSelector = (state: RootState) => {
    return state.polyline
}