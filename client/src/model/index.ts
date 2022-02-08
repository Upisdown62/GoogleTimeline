import moment, { Moment } from "moment";

export interface MRegisterUser {
    email: string,
    imgage?: string,
    name: string,
    password: string,
    social?: string
}

export interface MUser {
    userData: User
}

export interface User {
    isAuth: boolean,
    error: boolean,
    _id: string,
    isAdmin: boolean,
    email: string,
    name: string,
    role: number,
    image: string
}

export interface MUserAction {
    type: string,
    payload: string
}

export interface MOwnerId {
    owner: string
}


export interface MPolyline {
    polyline: MResPolyline[]
}

export interface MResPolyline {
    date: string,
    title: string,
    description: string,
    image: string[],
    useFlag: boolean,
    placeId?: string,
    address: string,
    point: Point[],
    name: string,
    startTime: string,
    endTime: string,
    activityType: string,
    index: number,
    visitType: string,
    _id: string,
    owner: string,
    createdAt: string,
    updatedAt: string
}

export interface Point {
    lat: number,
    lng: number
}

export interface MPolylineAction {
    type: string,
    payload: string
}

export interface MTheme {
    isDarkMode: boolean,
    toggleDarkMode: () => void
}

export interface MProgress {
    loading: boolean
}

export interface MProgressAction {
    type: string,
    payload: string
}

export interface MFileJson {
    path: string,
    lastModified: number,
    name: string,
    size: number,
    type: string
}

export interface MUploadJson {
    filePath: string[],
    userId: string
}

export interface MResDataSave {
    success: boolean,
    successCnt: number
}

export interface MResFileJson {
    success: boolean,
    files: MResFile[]
}

export interface MResFile {
    destination: string,
    encoding: string,
    fieldname: string,
    filename: string,
    mimetype: string,
    originalname: string,
    path: string,
    size: number
}

export interface MIDPW {
    email: string,
    password: string
}

export interface MResLogin {
    loginSuccess: string,
    userId: string
}

export interface MResCalendar {
    success: boolean,
    calendarInfo: {
        date: MCalendar[]
    }
}

export interface MCalendar {
    useFlag: boolean,
    date: Date
}

export interface MResCalendarArray {
    success: boolean,
    calendarInfo: MCalendarArray[]
}

export interface MCalendarArray {
    date: MCalendar[]
}

export interface MResDataUpdate {
    success: boolean,
    timelineInfo: MResPolyline[]
}

export interface MReqPolyline {
    id: string,
    title: string,
    useFlag : boolean,
    name: string,
    startTime: string,
    endTime: string,
    description: string,
    image: string[]
}

export interface MListPolyline {
    key: string,
    index: number,
    type: string,
    from: string
    to: string,
    location: string,
    useFlag: string
}

export interface MResUpdateFlag {
    success: boolean
}

export interface MReqGoogleLogin {
    data: {
        profile: object,
        tokenId: string
    }
}
export interface MResGoogleTry {
    profileObj: object,
    tokenId: string
}

export interface MResGoogleLogin {
    loginSuccess: boolean,
    userId: string,
    email?: string,
    social: string
}

export interface MMapPolyline {
    map: any,
    path: any[],
    strokeWeight: number,
    strokeColor: string,
    strokeOpacity: number,
    strokeStyle: string,
    endArrow: boolean,
    setMap: (m: any) => void
}

export interface MMapMarker {
    map: any,
    position: any,
    title: string,
    setMap: (m: any) => void
}

export interface MResPolylineDate {
    success: boolean,
    polylineInfo: MResPolyline[]
}