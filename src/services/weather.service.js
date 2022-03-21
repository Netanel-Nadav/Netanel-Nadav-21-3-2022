import axios  from "axios"

const API_KEY = '2ZMBkNNe2iuS7vhFgVnqexAODDCYcWBH'


export const weatherService ={
    query,
}


async function query(searchLocation){
    if (!searchLocation) searchLocation = 'Tel aviv'
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${searchLocation}&apikey=${API_KEY}`)
    return res.data
}