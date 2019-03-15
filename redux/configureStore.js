import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { centers } from './centers';
import { comments } from './comments';
import { leaders } from './leaders';
import {testOptions} from './testOptions';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';


const config = {
    key:'root',
    storage,
    debug: true
};
export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            centers,
            comments,
            leaders, 
            testOptions,
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor=persistStore(store)
    return {persistor, store};
}