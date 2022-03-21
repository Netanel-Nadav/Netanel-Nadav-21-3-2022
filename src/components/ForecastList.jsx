import React from 'react'
import { ForecastPreview } from './ForecastPreview'


export const ForecastList = ({forecast}) => {

  if (!forecast) return 'Loading..'
  return (
    <section className="forecast-list">
      {forecast.map(dailyForecast => <ForecastPreview dailyForecast={dailyForecast} />)}
    </section>
  )
}
