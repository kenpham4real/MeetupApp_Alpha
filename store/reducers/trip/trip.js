import { ADD_TRIP } from '../../actions/trip/trip';
import { Trip } from '../../../src/models/trip';

const initialState = {
    trips: []
}

export default tripReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TRIP: 
            
            const newTrip = new Trip(
                action.tripData.name,
                'u1',
                action.tripData.startDate,
                action.tripData.endDate,
                action.locations
            );
            
            return {
                ...state,
                trips: state.trips.concat(newTrip),
            }
        default: return state;
    }
}
