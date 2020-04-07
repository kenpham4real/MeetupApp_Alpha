import { Trip } from "../../../src/models/trip";
import axios from 'axios';

export const ADD_TRIP = 'ADD_TRIP';
export const SET_TRIP = 'SET_TRIP';

export const addTrip = (name, startDate, endDate, locations) => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        const userId = getState().auth.user.uid;
            const response = await fetch(
                `https://meetupapp-21180.firebaseio.com/trips.json?auth=${token}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        startDate,
                        endDate,
                        locations,
                        ownerId: userId,
                    })
                });

            const resData = await response.json();
            console.log(resData);

            dispatch({
                type: ADD_TRIP,
                tripData:{
                    id: resData.name,
                    ownerId: userId,
                    name,
                    startDate,
                    endDate,
                    locations
                }
            })
    }
};

export const fetchTrip = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        const userId = getState().auth.user.uid;
        try {
            const response = await axios.get(
                `https://meetupapp-21180.firebaseio.com/trips.json?auth=${token}`,{
                    method: 'GET',
                    
                }
            )
            
            // if(!response.ok){
            //     throw new Error('Something went wrong, please try again!')
            // };

            const resData = response.data;
            console.log(resData);
            const loadedTrips = [];
            console.log('Fetching...')
            for(let key in resData){
                loadedTrips.push(new Trip(
                    key,
                    resData[key].ownerId,
                    resData[key].name,
                    resData[key].startDate,
                    resData[key].endDate,
                    resData[key].locations
                ))
            };

            dispatch({
                type: SET_TRIP,
                tripsMade: loadedTrips,
                trips: loadedTrips.filter(trip => trip.ownerId === userId)
            })

        } catch (error) {
            console.log('Fetching has error (action)', error)
            throw error;
        }
        
    }
}