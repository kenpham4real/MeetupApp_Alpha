<<<<<<< HEAD
import { LOGIN } from '../../actions/auth/auth';
=======
// 'use strict'

import { LOGOUT, AUTHENTICATE } from '../../actions/auth/auth';
>>>>>>> 7261981... Updating post interaction functionality

const initialState = {
    user:{
        token: null,
        uid: null
    }
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return{
                user: {
                    token: action.userData.token,
                    uid: action.userData.uid
                }
            }
        default: return state;
    }
} 