import React from 'react'

// Components
import { ForecastPreview } from './ForecastPreview'


export const ForecastList = ({forecasts, isCelcius}) => {

  if (!forecasts) return 'Loading..'
  return (
    <section className="forecast-list grid-cards">
      {forecasts.map(dailyForecast => <ForecastPreview key={dailyForecast._id} dailyForecast={dailyForecast} isCelcius={isCelcius}/>)}
    </section>
  )
}
