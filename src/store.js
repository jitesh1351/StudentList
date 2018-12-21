import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import studentDetailsReducer from './reducers/studentDetailsReducer';


const rootReducer = combineReducers({studentDetailsReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
