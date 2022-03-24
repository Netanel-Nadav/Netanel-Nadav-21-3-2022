
export const LocationInfo = ({ onRemoveFromFav ,favLocations, location, toggleTemp, isCelcius, onAddToFavorites }) => {

    const { LocalizedName } = location
    return (
        <div className="location-info flex space-between align-center">
            <div className="title flex">
                <h1>{LocalizedName}</h1>
            </div>
            <div className="button-container flex justify-center">
                <button onClick={toggleTemp}>Show {isCelcius ? 'Farenhait' : 'Celcius'}</button>
            </div>
            <div className="wrraper flex align-center">
                {favLocations && favLocations.some(favLocation => favLocation.Key === location.Key) ?
                    <>
                        <i className="fas fa-heart" onClick={() => onRemoveFromFav(location.Key)}></i>
                        <button onClick={() => onRemoveFromFav(location.Key)}>Remove from favorites</button>
                    </>
                    :
                    <>
                        <i className="far fa-heart" onClick={onAddToFavorites}></i>
                        <button onClick={onAddToFavorites}>Add to favorites</button>
                    </>
                }
            </div>
        </div>
    )
}
