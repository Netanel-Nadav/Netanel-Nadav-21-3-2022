import React from 'react'
import { FavLocationPreview } from './FavLocationPreview'

export const FavList = ({favLocations}) => {

  
  return (
    <div className="fav-list grid-cards">
        {favLocations.map(location => <FavLocationPreview location={location} key={location._id}/>)}
    </div>
  )
}
