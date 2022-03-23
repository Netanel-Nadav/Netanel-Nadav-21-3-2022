const initialState = {
    favLocations: null
}

export function favoritesReducer(state = initialState, action) {
    
    let newState = state;


    switch (action.type) {
        case 'SET_FAVORITES':
            newState = { ...state, favLocations: action.favLocations }
            break;

        case 'ADD_FAV_LOCATION':
            newState = { ...state, favLocations: [...state.favLocations, action.favLocation] }
            break;


        default:
            return newState
        }

        return newState
}
