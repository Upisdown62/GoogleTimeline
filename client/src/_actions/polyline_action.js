//import axios from 'axios';
import {
    LOAD_POLYLINE
} from './types';
//import { POLYLINE_SERVER } from '../components/Config.js';
import ApiService from '../module/ApiService'

export function loadPolyline(inputDate, body){
    // const request = axios.post(`${POLYLINE_SERVER}/datas?date=${inputDate}`, body)
    //     .then(response => response.data);
    
    const request = ApiService.loadPolyline(inputDate, body)
    return {
        type: LOAD_POLYLINE,
        payload: request
    }
}