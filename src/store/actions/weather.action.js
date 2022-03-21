import { weatherService } from "../../services/weather.service"


export function loadLocation(searchTerm){
    return async (dispatch) => {
        try {
            const location = await weatherService.query(searchTerm)
            const action = {type: 'SET_LOCATION', location}
            dispatch(action)
        } catch (err) {
            console.log('Coulden\'t Get data');
        }
    }
}