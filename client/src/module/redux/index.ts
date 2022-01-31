import { combineReducers } from 'redux'
import user from './user'
import polyline from './polyline'

const rootReducer = combineReducers({
    user,
    polyline
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>