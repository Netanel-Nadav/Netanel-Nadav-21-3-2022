import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyForecasts, loadLocation, loadLocationByGeo } from '../store/actions/weather.action';

import { ForecastList } from '../components/ForecastList';
import { LocationInfo } from '../components/LocationInfo';
import { addToFavorites } from '../store/actions/favorites.action';
import { debounce } from 'lodash';

export const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [userCoords, setUserCoords] = useState(null)
  const [isCelcius, setIsCelcius] = useState(true)

  const { location, forecasts } = useSelector(state => state.weatherModule)
  const dispatch = useDispatch()



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
      // if (userCoords) dispatch(loadLocationByGeo(userCoords))
      debouncedTerm(searchTerm)
  }, [searchTerm])

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
    dispatch(addToFavorites(location))
  }

  if (!location) return 'Loading...'

  return (
    <section className='home'>
      <h1>Welcome to My weather App</h1>
      <div className="input-container">

        <input type="text"
          placeholder='Enter Search Location'
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)} />
      </div>
      <LocationInfo location={location} toggleTemp={toggleTemp} isCelcius={isCelcius} onAddToFavorites={onAddToFavorites} />
      <ForecastList forecasts={forecasts} isCelcius={isCelcius} />
    </section>
  );
}
