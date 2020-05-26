'use strict'

export const ENCRYPT = 'ENCRYPT';

export const encryptUser = (token, uid) => {
    return{
        type: ENCRYPT,
        userInfo:{
            token: token,
            uid: uid,
        }
    }
}