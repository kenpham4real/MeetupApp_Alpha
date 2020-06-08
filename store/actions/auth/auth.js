
'use strict'
import AsyncStorage from '@react-native-community/async-storage';
import {getAndroidId} from 'react-native-device-info';

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