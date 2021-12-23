import API from '../module/api'
import { USER_SERVER, POLYLINE_SERVER, CALENDAR_SERVER } from '../components/Config.js'

export default {
    registerUser(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${USER_SERVER}/register`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    loginUser(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${USER_SERVER}/login`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    getAuth(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.get(`${USER_SERVER}/auth`)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    logoutUser(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.get(`${USER_SERVER}/logout`)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    loadPolyline(date, body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/datas?date=${date}`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    googleLogin(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post('/api/google/login', body)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    imageUpload(formData, config){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/image`, formData, config)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataVaildation(formData, config){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/vaildation`, formData, config)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataSave(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/save`, body)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataUpdate(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/update`, body)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataUpdateFlag(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/updateFlag`, body)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    updateCalendar(body){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${CALENDAR_SERVER}/update`, body)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    getCalendar(body){   
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${CALENDAR_SERVER}`, body)
                resolve(result.data)
                // if(result.data.success && result.data.calendarInfo.length !== 0){
                //     let tempArray = []
                //     result.data.calendarInfo[0].date.map((cur) => {
                //         if(cur.useFlag) tempArray.push(new Date(cur.date))
                //     })
                //     resolve(tempArray)
                // }
            } catch(error) {
                reject(error)
            }
        })
    }
}