import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { weatherReducer } from './reducers/weather.reducer.js'
import { favoritesReducer } from './reducers/favorites.reducer.js'


const rootReducer = combineReducers({
    weatherModule: weatherReducer,
    favoritesModule: favoritesReducer,

})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))