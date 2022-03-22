import React, { useState } from 'react'

export const LocationInfo = ({ location, toggleTemp, isCelcius }) => {
    const { LocalizedName } = location

    

    return (
        <div className="location-info flex space-between align-center">
            <h1>{LocalizedName}</h1>
            <button onClick={toggleTemp}>Show {isCelcius ? 'Farenhait' : 'Celcius'}</button>
            <div className="wrraper flex align-center">
                <i className="far fa-heart"></i>
                <button>Add to favorites</button>
            </div>
        </div>
    )
}
