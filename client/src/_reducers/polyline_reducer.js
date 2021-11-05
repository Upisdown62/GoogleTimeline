import {
    LOAD_POLYLINE
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case LOAD_POLYLINE:
            return {...state, polyline: action.payload.polylineInfo}
        default:
            return state;
    }
}