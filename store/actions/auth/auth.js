<<<<<<< HEAD
=======
'use strict'
import { AsyncStorage } from 'react-native';
import {getAndroidId} from 'react-native-device-info';

>>>>>>> 7261981... Updating post interaction functionality
export const LOGIN = 'LOGIN';

export const addUser = (token, uid) => {
    return{
        type: LOGIN,
        userData:{
            token: token, 
            uid: uid
        }
    }
}