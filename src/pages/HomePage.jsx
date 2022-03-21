import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLocation } from '../store/actions/weather.action';



export const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const { location } = useSelector(state => state.weatherModule)
  const dispatch = useDispatch()

  useEffect(() => {
    const userLocation = navigator.geolocation.getCurrentPosition(succ => succ)
    console.log(userLocation);
    // dispatch(loadLocation(searchTerm))
  }, [])

  console.log(location);
  return (
    <section className='home'>
      <h1>Welcome to My weather App</h1>
      <div className="input-container">

        <input type="text"
          placeholder='Enter Search Location'
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)} />
      </div>
    </section>
  );
}
