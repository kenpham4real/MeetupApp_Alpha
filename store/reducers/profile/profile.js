import { ADD_PROFILE } from '../../actions/profile/profile';
import {Profile} from '../../../src/models/profile/profile';

const initialState = {
    userProfile: []
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
                userProfile: state.userProfile.concat(newProfile)
            }
        default: return state;
    }
}