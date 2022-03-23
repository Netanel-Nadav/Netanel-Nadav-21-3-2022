import axios from "axios"

import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"

const API_KEY = 'TTg4v4ttLyWXgh0M5GlwR0cnRk7PHOWF'


export const weatherService = {
    query,
    getLocationByGeo,
    getDailyForecasts,
    getLocationWeather
}


async function query(searchLocation) {
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${searchLocation}&apikey=${API_KEY}`)
    const location = res.data[0]
    return _getWeather(location)
}


async function getLocationByGeo(userCoords) {
    const { lat, long } = userCoords
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${long}`)
    const location = res.data
    return _getWeather(location)
}


async function getLocationWeather(locationKey) {
    const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`)
    const weather = res.data
    
    // delete weather.EpochTime
    // delete weather.HasPrecipitation
    // delete weather.Link
    // delete weather.LocalObservationDateTime
    // delete weather.MobileLink
    // delete weather.PrecipitationType

    // console.log(weather);
    return weather
}

async function getDailyForecasts(locationKey) {
    const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
    const dailyForecasts = res.data.DailyForecasts;
    const dailyWeather = dailyForecasts.map(dailyForecast => {
        return {
            date: dailyForecast.Date,
            day: dailyForecast.Day,
            night: dailyForecast.Night,
            temp: {
                celsius: {
                    max: +((dailyForecast.Temperature.Maximum.Value - 32) * 5 / 9).toFixed(),
                    min: +((dailyForecast.Temperature.Minimum.Value - 32) * 5 / 9).toFixed(),
                    unit: 'C'
                },
                fahrenheit: {
                    max: dailyForecast.Temperature.Maximum.Value,
                    min: dailyForecast.Temperature.Minimum.Value,
                    unit: 'F'
                }
            }
        }
    })
    return dailyWeather
}


async function _getWeather(location) {
    const locationKey = location.Key
    const forecasts = await getDailyForecasts(locationKey)
    forecasts.forEach(daily => {
        return daily._id = utilService.makeId()
    })
    return { location, forecasts }
}