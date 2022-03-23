import { storageService } from "./async-storage.service"
import { weatherService } from "./weather.service"

const STORAGE_KEY = 'favorite-locations'


export const favoritesService = {
    query,
    add,
    remove,
}

async function query() {
    const favoriteLocations = await storageService.query(STORAGE_KEY)
    const formatedLocation = await Promise.all(await favoriteLocations.map(async (location) => {
        return await weatherService.getLocationWeather(location)
    }))
    return formatedLocation
}

async function add(location) {
    const locations = await query(STORAGE_KEY)
    const { weather } = await weatherService.getLocationWeather(location)
    locations.find(loc => {
        if (loc.Key === location.Key) throw new Error('Location already in favorites')
    })
    delete location.AdministrativeArea
    delete location.Country
    delete location.Rank
    delete location.Type
    delete location.Version

    location.weather = weather
    const addedFavLocation = await storageService.post(STORAGE_KEY, location)
    return addedFavLocation
}

async function remove(locationId) {
    await storageService.remove(STORAGE_KEY, locationId)
}