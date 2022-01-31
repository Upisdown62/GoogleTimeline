import {
    LOAD_POLYLINE
} from '../_actions/types';
 
const initialState = {
    polyline: []
}

export default function(state = initialState,action){
    switch(action.type){
        case LOAD_POLYLINE:
            return {...state, polyline: action.payload.polylineInfo}
        default:
            return state;
    }
}