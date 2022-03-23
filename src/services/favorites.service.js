import { storageService } from "./async-storage.service"
import { weatherService } from "./weather.service"

const STORAGE_KEY = 'favorite-locations'


export const favoritesService = {
    query,
    add,
    remove,
}

async function query() {
    const favoviteLocations = await storageService.query(STORAGE_KEY)
    // const formatedLocation = favoviteLocations.map(location => {
    //     return {
    //         weather: weatherService.getLocationWeather(location.Key),
    //         LocalizedName: location.LocalizedName,
    //     }
    // })
    // console.log(formatedLocation);
    return favoviteLocations
}

async function add(location) {
    const locations =  await query(STORAGE_KEY)
    locations.find(loc => {
        if (loc.Key === location.Key) throw new Error('Location already in favorites')
    })     
        delete location.AdministrativeArea
        delete location.Country
        delete location.Rank
        delete location.Type
        delete location.Version
   
    const addedFavLocation = await storageService.post(STORAGE_KEY, location)
    return addedFavLocation
}

async function remove(location) {
    await storageService.remove(STORAGE_KEY, location)
}