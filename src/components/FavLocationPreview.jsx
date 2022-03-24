import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// Actions
import { remove } from '../store/actions/favorites.action'

// Imgs
import dayImg from '../assets/img/Sky.svg'
import nightImg from '../assets/img/Night.svg'
import { Link, useNavigate } from 'react-router-dom'
import { loadLocation } from '../store/actions/weather.action'



export const FavLocationPreview = ({ location }) => {


  const [icon, setIcon] = useState(null)
  const [isCelsious, setIsCelsious] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getIcon()
  }, [])


  const getIcon = () => {
    let imgSrc;
    if (!location.IsDayTime) {
      const { WeatherIcon } = location.weather
      if (WeatherIcon < 10) {
        imgSrc = `https://developer.accuweather.com/sites/default/files/0${WeatherIcon}-s.png`
        setIcon(imgSrc)
      } else {
        imgSrc = `https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`
        setIcon(imgSrc)
      }
    } else {
      const { WeatherIcon } = location.weather
      if (WeatherIcon < 10) {
        imgSrc = `https://developer.accuweather.com/sites/default/files/0${WeatherIcon}-s.png`
        setIcon(imgSrc)
      } else {
        imgSrc = `https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`
        setIcon(imgSrc)
      }
    }

  }


  const toggleTemp = () => {
    setIsCelsious(!isCelsious)
  }


  const onRemoveLocation = (locationId) => {
    dispatch(remove(locationId))
  }


  const { LocalizedName, weather, _id } = location
  const { IsDayTime, Temperature, WeatherText } = weather
  const { Imperial, Metric } = Temperature
  return (
    <Link to={`/${LocalizedName}`}>
      <div className="fav-location-preview">
        <div className="card-header" style={{ backgroundImage: `url(${IsDayTime ? dayImg : nightImg})` }}>
          <img src={icon} alt={WeatherText} className='icon' />
        </div>
        <div className="card-body">
          <h1>{LocalizedName}</h1>
          <small>Status</small>
          <p>{WeatherText}</p>
          <span>{isCelsious ? Metric.Value : Imperial.Value} {isCelsious ? Metric.Unit : Imperial.Unit} °</span>
        </div>
        <div className="card-footer flex space-between">
          <button onClick={() => onRemoveLocation(_id)}>Remove</button>
          <button onClick={toggleTemp}>{isCelsious ? 'Farenhait' : 'Celsious'}</button>
        </div>
      </div>
    </Link>
  )
}
