'use strict'

import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    PermissionsAndroid,
    Image
} from 'react-native';
<<<<<<< HEAD
=======
import Share from 'react-native-share'
import { useFocusEffect} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
>>>>>>> 7261981... Updating post interaction functionality

import { useSelector, useDispatch } from 'react-redux';
import {enableScreens} from 'react-native-screens';

import TripItem from '../../components/TripItem';
import { Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors'
import { unLoadPlace } from '../../../store/actions/place/place';
import * as tripActions from '../../../store/actions/trip/trip';

enableScreens();

const {width}=Dimensions.get('window');

const TripsListScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const trips = useSelector(state => state.trips.availableTrips);
    const dispatch = useDispatch();
<<<<<<< HEAD

=======
     
>>>>>>> 7261981... Updating post interaction functionality
    const loadTrips = useCallback(async() => {
        setError(null);
        setIsRefreshing(true);
        try {
            dispatch(tripActions.fetchTrip());
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setIsRefreshing(false);
    },[dispatch, setIsRefreshing, setError])

<<<<<<< HEAD
    useEffect(() => {
        const willFocus = props.navigation.addListener(
            'willFocus',
            loadTrips
        );
        return () => {willFocus.remove();}
    },[loadTrips]);
=======
    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus',() => loadTrips());
    //     return unsubscribe; 
    // },[loadTrips])

    useFocusEffect(useCallback (() => {
        loadTrips();
    },[dispatch,setIsRefreshing,setError]))
>>>>>>> 7261981... Updating post interaction functionality

    useEffect(() => {
        setIsLoading(true);
        loadTrips().then(
            setIsLoading(false),
        );
    }, [dispatch, loadTrips]);

    if(isLoading){
        return(
            <View>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if(!isLoading && trips.length === 0){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>No trips created. Let make some!</Text>
            </View>
        )
    }

    if (error) {
        return (
          <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text>An error occurred!</Text>
            <Button
              title="Try again"
              onPress={loadTrips}
              color={Colors.primary}
            />
          </View>
        );
      }

    return(
        <Layout style={[styles.container]}>
            <Layout style={styles.header}>
                <Icon2 color='black' name='back' style={{marginLeft: 20, marginTop: 20}} size={23} onPress={() => props.navigation.goBack()} />
                <Layout style={styles.titleContainer}>
                    <Text style={styles.title}>Let's pack for your trip</Text>
                </Layout>
                <Layout style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>And share it with your friends</Text>
                </Layout>
            </Layout>
            
            <View style={styles.list}>
                <FlatList
                    onRefresh={loadTrips}
                    refreshing={isRefreshing}
                    horizontal={true}
                    data={trips.reverse()}
                    keyExtractor={item => item.id}
                    renderItem={itemData => {
                        return(
                            <TripItem
<<<<<<< HEAD
                                onSelect={() => props.navigation.navigate('PlanningProcess', {screen: 'MainMapScreen', params: {doNotAddPlace: true}})}
                                onEdit={() => props.navigation.navigate('PlanningProcess', {screen: 'TripDescription'})}
=======
                                onSelect={() => props.navigation.navigate('PlanningProcess', {
                                    screen: 'MainMapScreen', 
                                    params: {doNotAddPlace: true}
                                })}
                                onEdit={() => props.navigation.navigate('PlanningProcess', {
                                    screen: 'TripDescription', 
                                    params: {
                                        doEditTrip: true,
                                        tripId: itemData.item.id
                                    }
                                })}
                                // onShare={() => {
                                //     // TODO: Refractor sharing API 
                                // (Sharing now is just saving a photo of the trip to local storage of the phone)
                                //     itemData.item.locations_Image 
                                //     ? (
                                //         // shareOptions.url = itemData.item.locations_Image,
                                //         alert("We will automatically save this trip's locations as a photo to your phone"),
                                //         _requestCameraPermission(itemData.item.locations_Image)
                                //         // Share.shareSingle(shareOptions)
                                //     )
                                //     : alert('This trip does not have an image to be share')
                                // }}
>>>>>>> 7261981... Updating post interaction functionality
                                eventName={itemData.item.name}
                                startDate={itemData.item.startDate}
                                endDate={itemData.item.endDate}
                            />
                            
                        )
                    }}
                />

            </View>
            <Layout style={styles.bottom}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('PlanningProcess',{
                            screen:'MainMapScreen',
                            params:{doAddPlace: Math.floor(Math.random()*1999999)}
                        });
                        dispatch(unLoadPlace());
                    }} 
                    style={styles.createTrip}>
                    <Layout style={styles.button} >
                        <Icon name='add' size={35} />
                    </Layout>
                </TouchableOpacity>
            </Layout>
        </Layout>
    );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        // borderColor: 'black', borderWidth: 1,
        flex: 3,
        justifyContent: 'center',
        
    },
    titleContainer:{
        // borderColor: 'black', borderWidth: 1,
        flex: 3,
        justifyContent: 'center',
        paddingLeft: 20,
        
    },
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#141f1f',
        width: 345
    },
    subtitleContainer:{
        // borderColor: 'black', borderWidth: 1,
        flex: 1,
        paddingLeft: 10,
        width: 300,
        paddingLeft: 20
    },
    subtitle:{
        fontSize: 20,
        color: '#141f1f'
    },
    list:{
        // borderColor: 'black', borderWidth: 1,
        flex: 7
    },
    bottom:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    createTrip:{
        flex: 1,
        marginRight: 20,
        
    },
    button:{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 8,
        shadowRadius: 1,
        shadowOpacity: 1,
        
    },
    dot:{
        width: 50,
        height: 50
    },
})

export default TripsListScreen;