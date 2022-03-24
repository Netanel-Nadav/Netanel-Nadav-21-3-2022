const initialState = {
    location: null,
    forecasts: null,
    msg: null,
    isDarkMode: false
}

export function weatherReducer (state = initialState, action) {
    switch (action.type) {

    case 'SET_LOCATION':
        return { ...state, location: action.location }
    
        case 'SET_DAILY_FORECAST':
        return { ...state, forecasts: action.forecasts }
    
        case 'SET_MSG':
        return { ...state, msg: action.msg }
        
        case 'CHANGE_MODE':
        return { ...state, isDarkMode: !state.isDarkMode }
    


    default:
        return state
    }
}
