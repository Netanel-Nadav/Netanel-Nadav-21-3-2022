import axios from "axios"
import { utilService } from "./util.service"

const API_KEY = '2ZMBkNNe2iuS7vhFgVnqexAODDCYcWBH'


export const weatherService = {
    query,
    getLocationByGeo,
    getDailyForecasts
}


async function query(searchLocation) {
    if (!searchLocation) searchLocation = 'Tel aviv'
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${searchLocation}&apikey=${API_KEY}`)
    const location = res.data[0]
    
    const locationKey = location.Key
    const forecasts = await getDailyForecasts(locationKey)
    forecasts.forEach(daily => {
        return daily._id = utilService.makeId()
    })
    return {location, forecasts}
}


async function getLocationByGeo(userCoords) {
    const { lat, long } = userCoords
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${long}`)
    return res.data
}


async function getDailyForecasts(locationKey) {
    const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
    return res.data.DailyForecasts
}