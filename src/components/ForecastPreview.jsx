import React, { useEffect, useState } from 'react'

// imgs
import day from '../assets/img/Sky.svg'
import night from '../assets/img/Night.svg'

export const ForecastPreview = ({ dailyForecast }) => {


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
      const { Icon } = dailyForecast.Day
      if (Icon < 10) {
        imgSrc = `https://developer.accuweather.com/sites/default/files/0${Icon}-s.png`
        setIcon(imgSrc)
      } else {
        imgSrc = `https://developer.accuweather.com/sites/default/files/${Icon}-s.png`
        setIcon(imgSrc)
      }
    } else {
      const { Icon } = dailyForecast.Night
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
    const date = dailyForecast.Date
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)
    const formattedDate = `${day}/${month}/${year}`
    setDate(formattedDate)
  }

  const { Day, Night, Temperature } = dailyForecast
  const { IconPhrase } = Day
  return (
    <section className="forecast-preview flex column space-between" onClick={toggleNight}>
      <div className="card-header">
        <img src={isNight ? night : day} alt="sky" />
        <img src={icon} alt={isNight ? IconPhrase : Night.IconPhrase} className="icon" />

      </div>
      <div className="card-body flex column justify-center">
        <div className="wrraper">
          <small>Date</small>
          <h2>{date}</h2>
        </div>
        <div className="wrraper">
          <small>Description</small>
          <p>{isNight ? IconPhrase : Night.IconPhrase}</p>
        </div>
      </div>
      <div className="card-footer">
        <span>Like</span>
      </div>
    </section>
  )
}
