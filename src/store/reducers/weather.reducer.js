const initialState = {
    location: null,
}

export function weatherReducer (state = initialState, action) {
    switch (action.type) {

    case 'SET_LOCATION':
        return { ...state, location: action.location }

    default:
        return state
    }
}
