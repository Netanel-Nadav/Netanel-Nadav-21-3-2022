import React from 'react'
import { ForecastPreview } from './ForecastPreview'


export const ForecastList = ({forecasts}) => {

  if (!forecasts) return 'Loading..'
  return (
    <section className="forecast-list grid-cards">
      {forecasts.map(dailyForecast => <ForecastPreview key={dailyForecast._id} dailyForecast={dailyForecast} />)}
    </section>
  )
}
