export const ADD_PROFILE = 'ADD_PROFILE';

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