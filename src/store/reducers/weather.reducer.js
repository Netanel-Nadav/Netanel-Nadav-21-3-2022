const initialState = {
    location: null,
    forecast: null
}

export function weatherReducer (state = initialState, action) {
    switch (action.type) {

    case 'SET_LOCATION':
        return { ...state, location: action.location }
    case 'SET_DAILY_FORECAST':
        return { ...state, forecast: action.forecast }

    default:
        return state
    }
}
