// 'use strict'

import { ADD_PROFILE,REMOVE_PROFILE_FOR_LOG_OUT } from '../../actions/profile/profile';
import {Profile} from '../../../src/models/profile/profile';

const initialState = {
    userProfile: {
        userName: null,
        userAvatar: null,
        userEmail: null
    }
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PROFILE:
            const newProfile = new Profile(
                action.profileData.name,
                action.profileData.avatar,
                action.profileData.email
            );

            return{
                ...state,
                userProfile:{
                    userName: newProfile.name,
                    userAvatar: newProfile.avatar,
                    userEmail: newProfile.email
                }
            }
        case REMOVE_PROFILE_FOR_LOG_OUT: 
            return initialState
        default: return state;
    }
}