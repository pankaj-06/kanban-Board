import { combineReducers } from 'redux';
import { LOGGED_OUT_USER } from '../Actions/AuthActions';
import { authenticationReducer } from './AuthReducer';

const appReducer = combineReducers({
    authenticationReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === LOGGED_OUT_USER) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;

