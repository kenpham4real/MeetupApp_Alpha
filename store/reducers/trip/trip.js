
// 'use strict'

import { ADD_TRIP, SET_TRIP, UPDATE_TRIP, SHARE_TRIP } from '../../actions/trip/trip';
import { Trip, TripShare } from '../../../src/models/trip';

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
        case UPDATE_TRIP:
            const userTripIndex = state.trips.findIndex(trip => trip.tripId === action.tripId);
            const availableTripIndex = state.availableTrips.findIndex(post => post.postId === action.tripId);
            const updatedTrip = new Trip(
                action.tripId,
                state.trips[userTripIndex].ownerId,
                action.tripData.name,
                action.tripData.startDate,
                action.tripData.endDate,
                state.trips.locations,
                state.locations_Image
            );
            const updatedUserTrips = [...state.trips];
            const updatedAvailableTrips = [...state.availableTrips];

            updatedUserTrips[userTripIndex] = updatedTrip;
            updatedAvailableTrips[userTripIndex] = updatedTrip;

            return{
                ...state,
                trips: updatedUserTrips,
                availableTrips: updatedAvailableTrips
            }
        default: return state;
    }
}
