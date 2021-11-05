import { combineReducers } from 'redux';
import user from './user_reducer';
import polyline from './polyline_reducer';

const rootReducer = combineReducers({
    user, polyline
});

export default rootReducer;