const initialState = {
    location: null,
    forecasts: null
}

export function weatherReducer (state = initialState, action) {
    switch (action.type) {

    case 'SET_LOCATION':
        return { ...state, location: action.location }
    case 'SET_DAILY_FORECAST':
        return { ...state, forecasts: action.forecasts }

    default:
        return state
    }
}
