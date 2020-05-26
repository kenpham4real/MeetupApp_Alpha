'use strict'

import { Trip } from "../../../src/models/trip";

export const ADD_TRIP = 'ADD_TRIP';
export const SET_TRIP = 'SET_TRIP';
<<<<<<< HEAD
=======
export const UPDATE_TRIP = 'UPDATE_TRIP';
export const SHARE_TRIP = 'SHARE_TRIP'
>>>>>>> 7261981... Updating post interaction functionality

export const addTrip = (name, startDate, endDate, locations, locations_Image) => {
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
                        locations_Image,
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
                    locations,
                    locations_Image
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
                    resData[key].locations,
                    resData[key].locations_Image
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
<<<<<<< HEAD
=======
}

export const updateTrip = (placeId, name, startDate, endDate) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        const token = getState().auth.user.token;

        try {
            const response = await fetch(
                `https://meetupapp-21180.firebaseio.com/users/${userId}/trips/${placeId}.json?auth=${token}`,{
                    method: 'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        name,
                        startDate,
                        endDate,
                    })
                }
            );
            if(!response.ok){
                throw new Error('Some thing went wrong, please try again');
            }

            dispatch({
                type: UPDATE_TRIP,
                tripId: placeId,
                tripData:{
                    name, 
                    startDate,
                    endDate
                }
            })
        } catch (error) {
            console.log('Patching has error (action)', error)
            throw error;
        }
    }
}

export const shareTrip = (uri) => {
    return {
        type: SHARE_TRIP,
        tripImgUri: uri
    }
>>>>>>> 7261981... Updating post interaction functionality
}