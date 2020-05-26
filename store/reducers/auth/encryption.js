// 'use strict'

export { ENCRYPT } from '../auth/encryption'

const initialState = {
    userEncryption:{
        token: null,
        uid: null
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ENCRYPT:
            return{
                userEncryption:{
                    token: action.userInfo.token,
                    uid: action.userInfo.uid
                }
            }
    }
}