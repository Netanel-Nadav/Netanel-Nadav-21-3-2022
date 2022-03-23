import { favoritesService } from "../../services/favorites.service"


export function query() {
    return async (dispatch) => {
        try {
            const favLocations = await favoritesService.query()
            const action = { type: 'SET_FAVORITES', favLocations }
            dispatch(action)
        } catch (err) {
            console.log('Coulden\'t get location to favorites');
        }
    }
}

export function addToFavorites(location) {
    return async (dispatch) => {
        try {
            const favLocation = await favoritesService.add(location)
            const action = { type: 'ADD_FAV_LOCATION', favLocation }
            dispatch(action)
            dispatch({type: 'SET_MSG', msg: {type: 'sucess', txt: 'Location added to favorites'}})
        } catch (err) {
            console.log('Coulden\'t Add location to favorites');
            dispatch({type: 'SET_MSG', msg: {type: 'error', txt: 'Coulden\'t Add location to favorites'}})
        }
    }
}


export function remove(locationId) {
    return async (dispatch) => {
        try {
            await favoritesService.remove(locationId)
            dispatch({type: 'REMOVE_LOCATION', locationId})
            dispatch({type: 'SET_MSG', msg: {type: 'sucess', txt: 'Location Removed from your favorites'}})
        } catch (err) {
            console.log('Coulden\'t remove location to favorites', err);
            dispatch({type: 'SET_MSG', msg: {type: 'error', txt: 'Coulden\'t Remove location to favorites'}})
        }
    }
}


export function clearMsg() {
    return async (dispatch) => {
        try {
            const action = {type: 'SET_MSG', msg: null}
            dispatch(action)
        } catch (err) {
            console.log(err);
        }
    }
}

