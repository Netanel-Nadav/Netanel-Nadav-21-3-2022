import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { ForecastList } from '../components/ForecastList';
import { LocationInfo } from '../components/LocationInfo';

// Actions
import { addToFavorites, remove } from '../store/actions/favorites.action';
import { loadLocation, loadLocationByGeo } from '../store/actions/weather.action';

// Debounce 
import { debounce } from 'lodash';
import { weatherService } from '../services/weather.service';



export const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [autoComplete, setAutoComplete] = useState('')
  const [userCoords, setUserCoords] = useState(null)
  const [isCelcius, setIsCelcius] = useState(true)

  const { location, forecasts } = useSelector(state => state.weatherModule)
  const { favLocations } = useSelector(state => state.favoritesModule)
  
  const dispatch = useDispatch()
  const { city } = useParams()
  
  useEffect(() => {
    if (city) {
      dispatch(loadLocation(city))
    } else {
      if (userCoords) dispatch(loadLocationByGeo(userCoords))
      else navigator.geolocation.getCurrentPosition(success)
    }
  }, [userCoords, city])

  useEffect(() => {
    if (searchTerm) debouncedTerm(searchTerm)
    loadSuggestion()
  }, [searchTerm])


  const loadSuggestion = async () => {
    const { suggestions } = await weatherService.query(searchTerm)
    setAutoComplete(suggestions)
  }

  const success = (pos) => {
    const crd = pos.coords;
    setUserCoords({
      lat: crd.latitude,
      long: crd.longitude
    })
  }

  const debouncedTerm = useCallback(
    debounce((term) => dispatch(loadLocation(term)), 500),
    []
  )

  const toggleTemp = () => {
    setIsCelcius(!isCelcius)
  }

  const onAddToFavorites = () => {
    console.log(location);
    dispatch(addToFavorites(location))
  }

  const onRemoveFromFav = (locationKey) => {
    dispatch(remove(locationKey))
  }

  if (!location) return 'Loading...'
  return (
    <section className='home'>
      <h1>Welcome to My weather App</h1>
      <div className="input-container">

        <input type="text"
          placeholder='Enter Search Location'
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
          list="cities"
        />
        <datalist id="cities">
          {autoComplete && autoComplete.map((suggest, idx) => {
            return (
              <option key={idx} value={suggest.LocalizedName} />
            )
          })}
        </datalist>
      </div>
      <LocationInfo onRemoveFromFav={onRemoveFromFav} favLocations={favLocations} location={location} toggleTemp={toggleTemp} isCelcius={isCelcius} onAddToFavorites={onAddToFavorites} />
      <ForecastList forecasts={forecasts} isCelcius={isCelcius} />
    </section>
  );
}
