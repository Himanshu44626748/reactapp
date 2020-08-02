import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    errmess: '',
    dishes: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errmess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errmess: null, dishes: []};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: false, errmess: action.payload};

        default: 
        return state;
    }
};