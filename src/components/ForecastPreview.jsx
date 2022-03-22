import React, { useEffect, useState } from 'react'

// imgs
import dayImg from '../assets/img/Sky.svg'
import nightImg from '../assets/img/Night.svg'

export const ForecastPreview = ({ dailyForecast, isCelcius }) => {


  const [icon, setIcon] = useState(null)
  const [date, setDate] = useState(null)
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    getIcon()
    formatDate()
  }, [isNight])


  const getIcon = () => {
    let imgSrc;
    if (!isNight) {
      const { Icon } = dailyForecast.day
      if (Icon < 10) {
        imgSrc = `https://developer.accuweather.com/sites/default/files/0${Icon}-s.png`
        setIcon(imgSrc)
      } else {
        imgSrc = `https://developer.accuweather.com/sites/default/files/${Icon}-s.png`
        setIcon(imgSrc)
      }
    } else {
      const { Icon } = dailyForecast.night
      if (Icon < 10) {
        imgSrc = `https://developer.accuweather.com/sites/default/files/0${Icon}-s.png`
        setIcon(imgSrc)
      } else {
        imgSrc = `https://developer.accuweather.com/sites/default/files/${Icon}-s.png`
        setIcon(imgSrc)
      }
    }

  }

  const toggleNight = () => {
    setIsNight(!isNight)
  }

  const formatDate = () => {
    const date = dailyForecast.date
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)
    const formattedDate = `${day}/${month}/${year}`
    setDate(formattedDate)
  }

  const { day, night, temp } = dailyForecast
  const { IconPhrase } = day
  const { celsius, fahrenheit } = temp

  return (
    <section className="forecast-preview flex column space-between" onClick={toggleNight}>
      <div className="card-header">
        <img src={isNight ? nightImg : dayImg} alt="sky" />
        <img src={icon} alt={isNight ? IconPhrase : night.IconPhrase} className="icon" />

      </div>
      <div className="card-body flex column justify-center">
        <div className="wrraper">
          <small>Date</small>
          <h2>{date}</h2>
        </div>
        <div className="wrraper">
          <small>Description</small>
          <p>{isNight ? IconPhrase : night.IconPhrase}</p>
        </div>
        {isCelcius && <span>{isNight ? celsius.min : celsius.max} {celsius.unit} °</span>}
        {!isCelcius && <span>{isNight ? fahrenheit.min : fahrenheit.max} {fahrenheit.unit} °</span>}
      </div>
      <div className="card-footer">
        <span>Like</span>
      </div>
    </section>
  )
}
