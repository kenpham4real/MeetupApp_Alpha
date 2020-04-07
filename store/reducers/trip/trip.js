import { ADD_TRIP, SET_TRIP } from '../../actions/trip/trip';
import { Trip } from '../../../src/models/trip';

const initialState = {
    trips: [],
    availableTrips:[]
}

export default tripReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TRIP: 
            
            const newTrip = new Trip(
                action.tripData.id,
                action.tripData.ownerId,
                action.tripData.name,
                action.tripData.startDate,
                action.tripData.endDate,
                action.locations
            );
            
            return {
                ...state,
                trips: state.trips.concat(newTrip),
                availableTrips: state.availableTrips.concat(newTrip),
            }
        case SET_TRIP:
            return{
                trips: action.trips,
                availableTrips: action.tripsMade
            }
        default: return state;
    }
}
