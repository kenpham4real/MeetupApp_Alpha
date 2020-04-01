export const ADD_TRIP = 'ADD_TRIP';

export const addTrip = (name, startDate, endDate, locations) => {
    return {
        type: ADD_TRIP,
        tripData: {
            name: name,
            startDate: startDate,
            endDate: endDate,
            locations: locations
        }
    }
}