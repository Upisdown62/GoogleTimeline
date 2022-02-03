import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loadingOn, loadingOff } from 'module/redux/progress'
import store from 'module/redux/index';
import { useSelector } from 'react-redux'
/**
 * AXIOS 설정
 */

const API = axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

// 요청 인터셉터 추가
API.interceptors.request.use(
    (config) => {
        //request 시작하면 on
        //console.log('API::Request', config)
        return config
    },
    (error) => {
        //request가 에러를 내면 바로 off
        return error
    }
)


// 응답 인터셉터 추가
API.interceptors.response.use(
    (response) => {
        //response가 끝나면 off
        return response
    },
    (error) => {
        //request 시작하면 on
        return error
    }
)

export default API