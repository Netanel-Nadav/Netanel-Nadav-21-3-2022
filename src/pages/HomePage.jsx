import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyForecasts, loadLocation, loadLocationByGeo } from '../store/actions/weather.action';

import { ForecastList } from '../components/ForecastList';

export const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [userCoords, setUserCoords] = useState(null)

  const { location, forecast } = useSelector(state => state.weatherModule)
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

  if (!location && forecast) return 'Loading...'

  return (
    <section className='home'>
      <h1>Welcome to My weather App</h1>
      <div className="input-container">

        <input type="text"
          placeholder='Enter Search Location'
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)} />
      </div>
      <ForecastList forecast={forecast} />
    </section>
  );
}
