import { legacy_createStore} from 'redux';
import rootReducers from '../Reducers';


export const store = legacy_createStore(rootReducers);
export type RootState = ReturnType<typeof store.getState>