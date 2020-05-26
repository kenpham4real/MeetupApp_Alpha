<<<<<<< HEAD
import { ADD_PLACE, UNLOAD_PLACE } from '../../actions/place/place';
=======
// 'use strict'

import { 
    ADD_PLACE, 
    UNLOAD_PLACE,
    DELETE_PLACE,
} from '../../actions/place/place';
>>>>>>> 7261981... Updating post interaction functionality
import { Place } from '../../../src/models/place'

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.name, 
                action.placeData.address
            );
            
            return {
                ...state,
                places: state.places.concat(newPlace),
            };
            
        case UNLOAD_PLACE: 
            
            return {
                places: initialState.places
            }
            
        default: return state;
    }
}