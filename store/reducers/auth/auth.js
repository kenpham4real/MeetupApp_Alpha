
// 'use strict'

import { LOGOUT, AUTHENTICATE, LOGIN } from '../../actions/auth/auth';

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