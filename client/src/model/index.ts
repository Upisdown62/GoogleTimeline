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
    polyline: Polyline[]
}

export interface Polyline {
    date: string,
    title?: string,
    description?: string,
    image?: string[],
    useFlag: boolean,
    placeId?: string,
    address?: string,
    point: Point[],
    name?: string,
    startTime: string,
    endTime: string,
    activityType?: string,
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
    payload: {
        polylineInfo: []
    }
}

export interface MTheme {
    isDarkMode: boolean,
    toggleDarkMode: () => void
}