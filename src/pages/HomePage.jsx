import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyForecasts, loadLocation, loadLocationByGeo } from '../store/actions/weather.action';

import { ForecastList } from '../components/ForecastList';
import { LocationInfo } from '../components/LocationInfo';

export const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [userCoords, setUserCoords] = useState(null)
  const [isCelcius, setIsCelcius] = useState(true)

  const { location, forecasts } = useSelector(state => state.weatherModule)
  const dispatch = useDispatch()



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
    // if (userCoords) dispatch(loadLocationByGeo(userCoords))
    dispatch(loadLocation(searchTerm))
  }, [searchTerm])

  const success = (pos) => {
    const crd = pos.coords;
    setUserCoords({
      lat: crd.latitude,
      long: crd.longitude
    })
  }

  const toggleTemp = () => {
    setIsCelcius(!isCelcius)
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
      <LocationInfo location={location} toggleTemp={toggleTemp} isCelcius={isCelcius} />
      <ForecastList forecasts={forecasts} isCelcius={isCelcius}/>
    </section>
  );
}
