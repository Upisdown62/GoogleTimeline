import {
    LOADING_ON,
    LOADING_OFF
} from '../_actions/types';
 

export default function(state={loading: false},action){
    switch(action.type){
        case LOADING_ON:
            return {...state, loading: true}
        case LOADING_OFF:
            return {...state, loading: false}
        default:
            return state;
    }
}