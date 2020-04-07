import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Alert,
    Button,
    Text,
    TouchableOpacity
} from 'react-native';

// Components
import mainStyle from '../../components/UI/MainStyle';
import mainButton from '../../components/UI/MainButton';

// Redux store
import { addProfile } from '../../../store/actions/profile/profile';

// NPM Package
import {useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Colors from '../../constants/Colors';
import { addUser } from '../../../store/actions/auth/auth';

const LoginScreen = (props) => {

    const [userInfo, setUserInfo] = useState(null);
    const [isLogIn, setIsLogIn] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const dispatch = useDispatch();
    
    // Facebook log in
    const  facebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                (res) => {
                    if(res.isCancelled){
                        console.log('Something went wrong, please try again');
                    }else{
                        AccessToken.getCurrentAccessToken().then(
                            async (data) => {
                              console.log(data.accessToken.toString())
                              const cred = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                              const firebaseCred = await firebase.auth().signInWithCredential(cred);
                              setIsLogIn(true);
                              setUserInfo(data.userID);
                              props.navigation.navigate('AppNavigator', {screen: 'Welcome'})
                            }
                            
                          )
                    }
                }
            )
        } catch (err) {
            console.log(err);
        }
      }

    // Google log in
    const _googleLogIn = async () => {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '830356483356-iki0grro8e49m30hulqu0gsh7tdicb16.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
            accountName: '',
            
        });
        try {            
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            console.log(user.user.name);
            console.log(user.idToken);
            setUserInfo(user.user.name);
            setUserAvatar(user.user.photo);
            setUserEmail(user.user.email);

            setIsLogIn(true);

            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            const firebaseCredential = await firebase.auth().signInWithCredential(credential);
            const idToken = await firebaseCredential.user.getIdToken(true)
            if(user){
                console.log('Firebase credential', firebaseCredential)
                dispatch(addUser(
                    idToken,
                    firebaseCredential.user.uid
                ));

                dispatch(addProfile(
                    firebaseCredential.user.displayName,
                    firebaseCredential.user.photoURL,
                    firebaseCredential.user.email
                ));
                firebase.auth().onAuthStateChanged((user) => {
                    if(user){
                        props.navigation.navigate('AppNavigator',{
                            screen: 'ProfileScreen'
                        });
                    }else{
                        throw new Error('Something went wrong, please try to login again!')
                    }
                })
                
            }
            
        } catch (error) {
            if(error.code === statusCodes.SIGN_IN_CANCELLED){
                // User has cancelled the sign in flow
                Alert.alert('You have cancelled the log in', {
                    text: 'OK',
                });
            }else if(error.code === statusCodes.IN_PROGRESS){
                // User have already in the sign in flow
                Alert.alert("You've already logged in, please wait for a minute", {text: 'OK'});
            }else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                // Not available
                Alert.alert('Services are not available now, please come back later', {text: 'OK'});
            }else{
                console.log(error);
                throw error;
            }
        }
    }

    // Log user in silently
    const getCurrentUserInfo = async () => {
        try {
            const user = await GoogleSignin.signInSilently();
            setUserInfo(user);

        } catch (err) {
            if(err.code === statusCodes.SIGN_IN_REQUIRED){
                // user hasn't signed in yet
                setIsLogIn(false);
            }else{
                setIsLogIn(false);
                console.log(err);
                throw err;
            }
        }
    }

    return(
        <ImageBackground source={require('../../../assets/images/water.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={{flex: 2}}/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.facebook, mainButton.button]} onPress={facebookLogin}>
                        <View style={styles.logo}><Icon color='white' name='facebook' size={30} /></View>
                        <View style={styles.continue}><Text style={styles.loginTitle}>Continue with Facebook</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.google, mainButton.button]} onPress={_googleLogIn}>
                        <View style={styles.logo}><Icon color='white' name='google' size={27} /></View>
                        <View style={styles.continue}><Text style={styles.loginTitle}>Continue with Google</Text></View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footer}>By continuing, you agree to the Terms of Use and Privacy Policy</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonContainer:{
        // borderColor: 'black', borderWidth: 1,
        flex: 1,
        alignSelf: 'stretch',
        // justifyContent: 'space-around',
        alignItems: 'center',
    },
    facebook:{
        flexDirection: 'row',
        width: 300,
        height: 48,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        marginTop: 25,
        
    },
    google:{
        flexDirection: 'row',
        fontSize: 30,
        width: 300,
        height: 48,
        backgroundColor: '#FF433C',
        borderRadius: 5,
        marginTop: 25
    },
    logo:{
        // borderColor: 'black', borderWidth: 1,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    continue:{
        flex: 3,
        // borderColor: 'black', borderWidth: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    loginTitle:{
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    },
    footer:{
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: 'grey',
        marginBottom: 15
    },
})
export default LoginScreen;