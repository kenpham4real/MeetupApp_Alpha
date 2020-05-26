'use strict'

export const ADD_PROFILE = 'ADD_PROFILE';
export const REMOVE_PROFILE_FOR_LOG_OUT = 'REMOVE_PROFILE_FOR_LOG_OUT'

export const addProfile = (name, avatar, email) => {
    return{
        type: ADD_PROFILE,
        profileData:{
            name: name,
            avatar: avatar,
            email: email
        }
    }
}

export const removeProfile = () => {
    return{
        type: REMOVE_PROFILE_FOR_LOG_OUT
    }
}