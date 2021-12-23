import { combineReducers } from 'redux';
import user from './user_reducer';
import polyline from './polyline_reducer';
import progress from './progress_reducer';

const rootReducer = combineReducers({
    user, polyline, progress
});

export default rootReducer;