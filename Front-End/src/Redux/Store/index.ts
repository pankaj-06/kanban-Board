import { applyMiddleware, legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../Reducers';


export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>