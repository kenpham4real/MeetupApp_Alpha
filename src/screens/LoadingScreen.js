'use strict'

import React, {useEffect, useState} from 'react';
import {
    View,
    Image, 
    Animated, 
    Dimensions, 
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import firebase from '@react-native-firebase/app'

import { quotes } from '../../data/quotes';
import * as authActions from '../../store/actions/auth/auth';
import {addProfile} from '../../store/actions/profile/profile'

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const LoadingScreen = (props) => {
    
    const [logoPosition] = useState(new Animated.Value(0));
    const [textPosition] = useState(new Animated.Value(0));

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        Animated.timing(logoPosition,{
            toValue: 1,
            duration: 2000
        }).start();
        Animated.timing(textPosition, {
            toValue: 1,
            duration: 8000
        }).start(tryLogin);
        
    },[dispatch]);
    
    const refreshToken = async () => {
        const {uid, photoURL, email, displayName} = firebase.auth().currentUser;
        await firebase.auth().currentUser.getIdToken(true).then((idToken) => {
            dispatch(authActions.addUser(idToken, uid));
            dispatch(addProfile(displayName,photoURL,email));
        });
        
    }
    const tryLogin = async () => {
        
        const userData = await AsyncStorage.getItem('userData');
        
        if(!userData){
            props.navigation.navigate('AuthNavigator');
            return;
        }

        const transformedData = JSON.parse(userData);
        const { token, uid } = transformedData;
        if(!token || !uid){
            props.navigation.navigate('AuthNavigator');
            return;
        }
        
        await refreshToken();
        props.navigation.navigate('AppNavigator');
    };


    return(
        <ImageBackground source={require('../../assets/images/sitting.jpg')} style={styles.container}>
            <View style={styles.overLay}>
                <Animated.View style={[styles.logoContainer, {opacity: logoPosition}]}>
                    <Image style={styles.logo} source={require('../../assets/images/logo2.png')} />
                </Animated.View>
                <Animated.View style={[styles.quoteView, {opacity: textPosition}]}>
                    <Text style={styles.quote}>{quotes[Math.floor(Math.random()*100)]}</Text>
                </Animated.View>
            </View>
        </ImageBackground>
        
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    overLay:{
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoContainer:{
        // borderColor:'black', borderWidth:1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: 200,
        height: 200
    },
    quoteView:{
        // borderColor:'black', borderWidth:1,
        flex: 2,
        // justifyContent: 'center',
        alignItems: 'center',
        width: 350
        
    },
    quote:{
        marginTop: 45,
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Regular' ,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center'
    }
    
})