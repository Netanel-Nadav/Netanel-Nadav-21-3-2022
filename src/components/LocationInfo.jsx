import React from 'react'

export const LocationInfo = ({ location }) => {
    const { LocalizedName } = location
    return (
        <div className="location-info flex space-between align-center">
            <h1>{LocalizedName}</h1>
            <button>Add to favorites</button>
        </div>
    )
}
