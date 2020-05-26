<<<<<<< HEAD
import React, { useState } from 'react';
=======
'use strict'

import React, { useState, useCallback, useRef } from 'react';
>>>>>>> 7261981... Updating post interaction functionality
import {
    FlatList,
    Text,
    StyleSheet,
    View,
<<<<<<< HEAD
    Image,
    Animated,
    ImageBackground
} from 'react-native'
import {
    Layout,
    Card,
    Divider,
    List
} from '@ui-kitten/components';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconDone from 'react-native-vector-icons/MaterialIcons'
// import CollapsingToolbar from 'react-native-collapsingtoolbar';
=======
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Image,
    PermissionsAndroid
} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconDone from 'react-native-vector-icons/MaterialIcons'
import ViewShot, {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
>>>>>>> 7261981... Updating post interaction functionality

import PlaceItem from '../../components/PlaceItem';
<<<<<<< HEAD
import CarUI from '../../components/UI/Card';
import {addTrip} from '../../../store/actions/trip/trip'
import { TouchableOpacity } from 'react-native-gesture-handler';
=======
import {addTrip, updateTrip} from '../../../store/actions/trip/trip'
>>>>>>> 7261981... Updating post interaction functionality

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const TripsListDetailScreen = (props) => {

<<<<<<< HEAD
    const {final_eventName} = props.route.params;
    const {final_startDate} = props.route.params;
    const {final_endDate} = props.route.params;

    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);

    // const places = arrayOf_desName.map((name, index) => ({
    //     name: name,
    //     address: arrayOf_desAddress[index],
    //     id: index
    //   }));

    const onFinish = () => {
        console.log('add trip');
        dispatch(addTrip(final_eventName, final_startDate, final_endDate, places))
=======
    // tripId is passed from TripListScreen which belongs to the trip user wants to edit
    const {final_eventName, final_startDate, final_endDate, tripId, doEditTrip} = props.route.params;
    const [chosenPlaces, setChosenPlaces] = useState([]);
    const [imgShareUri, setImgShareUri] = useState('');
    const viewShot = useRef(null);
    const dispatch = useDispatch();
    // If user wants to edit their trip --> doEditTrip = true
    // Select places from available trips, else select from places passed from MainMap
    const places = doEditTrip ? useSelector(state => state.trips.availableTrips) : useSelector(state => state.places.places);

    useFocusEffect(useCallback(() => {
        checkPlaces();
    },[tripId]))
    
    // Check if tripId is passed and doEditTrip == true
    // If so map each locations to chosenPlaces
    const checkPlaces= () => {
        if(tripId && doEditTrip){
            for(const key in places){
                if(places[key].id === tripId){
                    setChosenPlaces(places[key].locations)
                }
            }
        }else{
            return;
        }
    }

    const onFinish = () => {

        doEditTrip 
        ? dispatch(updateTrip(tripId, final_eventName, final_startDate, final_endDate))
        : dispatch(addTrip(final_eventName, final_startDate, final_endDate, places, imgShareUri)) 
        
>>>>>>> 7261981... Updating post interaction functionality
        props.navigation.navigate('TripsListScreen');
    }

    const onCapture = async () => {
        alert('Spot will automatically save this trip as a photo to your phone!')
        // _requestCameraPermission().then(() => {
            captureRef(viewShot, {
                format: "jpg",
                quality: 0.8,
                // result: 'base64',
                // snapshotContentContainer: true
            }).then(
                (uri) => {
                    console.log("Image saved to", uri);
                    setImgShareUri(uri);
                    CameraRoll.saveToCameraRoll(uri);
                },
            );
        // }).catch(err => console.log(err))
    }

        // Check permission for android
    const checkAndroidPermission = async () => {
        try {
          const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
          await PermissionsAndroid.request(permission);
        //   Promise.resolve();
        } catch (error) {
        //   Promise.reject(error);
            console.log(error)
        }
    };
    
    // Request CAMERA permission for android
    // For iOS: ( from reactnative.dev docs)
    /* 
        The user's permission is required in order to access the Camera Roll on devices running iOS 10 or later. 
        Add the NSPhotoLibraryUsageDescription key in your Info.plist with a string that describes how your app will use this data. 
        This key will appear as Privacy - Photo Library Usage Description in Xcode.
        If you are targeting devices running iOS 11 or later, you will also need to add the NSPhotoLibraryAddUsageDescription key in your Info.plist.
        Use this key to define a string that describes how your app will use this data.
        By adding this key to your Info.plist, you will be able to request write-only access permission from the user. 
        If you try to save to the camera roll without this permission, your app will exit.
    */
   // TODO: This permission request has not been set up for iOS
    const _requestCameraPermission = async () => {
    
        try{
            if(Platform.OS === 'android'){
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    console.log('PERMISSION GRANTED');
                    await checkAndroidPermission();
                }
            };
        } catch(err){
            console.warn(err);
            throw err;
        };
    };

    return(
        <ViewShot style={styles.container} ref={viewShot}>
            <ImageBackground source={require('../../../assets/images/beach.jpg')} style={styles.container}>
                <View style={styles.info}>
                    <View style={styles.tripName}>
                        <View style={styles.header}><Text style={styles.title}> {final_eventName}</Text></View>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity onPress={onCapture} style={styles.button}>
                                <IconDone name='share' size={23} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onFinish} style={styles.button}>
                                <IconDone name='done' size={23} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                        <Icon style={{marginRight: 10}} name='calendar' size={25} />
                        <Text style={{fontSize: 17}}>From: {final_startDate}</Text>
                    </View>
                    <View style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                        <Icon style={{marginRight: 10}} name='calendar' size={25} />
                        <Text style={{fontSize: 17}}>To: {final_endDate}</Text>
                    </View>
                </View>

                <View style={{flex: 2}}>
                        <FlatList
                            style={styles.list}
                            data={doEditTrip ? chosenPlaces : places}  
                            keyExtractor={(item) => item.id}
                            renderItem={(itemData) => {
                                return(
                                    <PlaceItem
                                        name={itemData.item.name}
                                        address={itemData.item.address}
                                    />
                                )
                            }}
                        />
                    
                </View>
                <View style={{height: 60, width: WIDTH, justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center'}}>
                    <BannerAd
                        unitId={TestIds.BANNER}
                        size={BannerAdSize.SMART_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
<<<<<<< HEAD
            </View>


            <View style={{flex: 2}} >
                <FlatList
                    style={styles.list}
                    data={places}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => {
                        return(
                            <PlaceItem
                                name={itemData.item.name}
                                address={itemData.item.address}
                            />
                        )
                    }}
                />

            </View>
            <View style={{height: 100}}/>
        </ImageBackground>
=======
            </ImageBackground>
        </ViewShot>
>>>>>>> 7261981... Updating post interaction functionality
    )
}

export default TripsListDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info:{
        flex: 1,
        width: 350,
        justifyContent: 'center',
    },
    tripName:{
        flex: 2,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop: 30,
        
    },
    header:{
        
        flex: 3
    },
    buttonWrapper:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontFamily: 'Roboto-Regular',
        fontSize: 45
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        height: 50, 
        width:50, 
        borderRadius: 25, 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 10
    },
    list: {
        flex: 3,
    }
});

