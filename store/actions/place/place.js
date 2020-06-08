'use strict'

export const ADD_PLACE = 'ADD_PLACE';
export const UNLOAD_PLACE ='UNLOAD_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = (placeId,name, address) => {
    return {
        type: ADD_PLACE,
        placeData: {
            placeId: placeId,
            name: name,
            address: address
        }
    };
};

export const unLoadPlace = () => {
    return {
        type: UNLOAD_PLACE,
    }
}

export const deletePlace = (placeId) => {
    return {
        type: DELETE_PLACE,
        placeId
    }
}