import {
    LOADING_ON,
    LOADING_OFF
} from './types'

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