export const ADD_PLACE = 'ADD_PLACE';
export const UNLOAD_PLACE ='UNLOAD_PLACE';

export const addPlace = (name, address) => {
    return {
        type: ADD_PLACE,
        placeData: {
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