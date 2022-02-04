import API from './api'
import { USER_SERVER, POLYLINE_SERVER, CALENDAR_SERVER } from 'components/Config'
import { MResFileJson, MUploadJson, MIDPW, MResDataSave, MResLogin, MResDataUpdate, MReqPolyline, MResCalendar, MResUpdateFlag, MResGoogleLogin, MReqGoogleLogin } from "model"

export default {
    registerUser(body: any){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${USER_SERVER}/register`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    loginUser(body: MIDPW): Promise<MResLogin>{
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
    loadPolyline(date: any, body: any){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/datas?date=${date}`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    googleLogin(body: MReqGoogleLogin) : Promise<MResGoogleLogin>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post('/api/google/login', body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    imageUpload(formData: any, config: any){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/image`, formData, config)
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataVaildation(formData: any, config: any) : Promise<MResFileJson>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/vaildation`, formData, config)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataSave(body: MUploadJson) : Promise<MResDataSave>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/save`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataUpdate(body: MReqPolyline) : Promise<MResDataUpdate>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/update`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    dataUpdateFlag(body: any) : Promise<MResUpdateFlag>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${POLYLINE_SERVER}/updateFlag`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    updateCalendar(body: any) : Promise<MResCalendar>{
        return new Promise(async(resolve, reject) => {
            try {
                const result = await API.post(`${CALENDAR_SERVER}/update`, body)
                resolve(result.data)
            } catch(error) {
                reject(error)
            }
        })
    },
    getCalendar(body: any){   
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