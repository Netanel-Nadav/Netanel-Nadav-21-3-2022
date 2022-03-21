import { weatherService } from "../../services/weather.service"


export function loadLocation(searchTerm) {
    return async (dispatch) => {
        try {
            const { location, forecast } = await weatherService.query(searchTerm)
            dispatch({ type: 'SET_LOCATION', location })
            dispatch({ type: 'SET_DAILY_FORECAST', forecast })
        } catch (err) {
            console.log('Coulden\'t Get data');
        }
    }
}


export function loadLocationByGeo(userCoords) {
    return async (dispatch) => {
        try {
            const location = await weatherService.getLocationByGeo(userCoords)
            const action = { type: 'SET_LOCATION', location }
            dispatch(action)
        } catch (err) {
            console.log('Coulden\'t Get data with user coords');
        }
    }
}


export function getDailyForecasts(locationKey) {
    return async (dispatch) => {
        try {
            const forecasts = await weatherService.getDailyForecasts(locationKey)
            const action = { type: 'SET_DAILY_FORECAST', forecasts }
            dispatch(action)
        } catch (err) {
            console.log('Coulden\'t Get daily Forecast');
        }
    }
}