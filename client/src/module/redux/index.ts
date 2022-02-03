import { combineReducers } from 'redux'
import user from './user'
import polyline from './polyline'
import progress from './progress'

const rootReducer = combineReducers({
    user,
    polyline,
    progress
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>