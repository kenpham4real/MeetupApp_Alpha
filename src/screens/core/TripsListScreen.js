import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {enableScreens} from 'react-native-screens';

import TripItem from '../../components/TripItem';
import { Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    },[dispatch, setIsRefreshing, setError]);

    useEffect(() => {
        const willFocus = props.navigation.addListener(
            'willFocus',
            loadTrips
        );
        return () => {willFocus.remove();}
    },[loadTrips]);

    useEffect(() => {
        setIsLoading(true);
        loadTrips().then(
            setIsLoading(false),
        );
    }, [dispatch, loadTrips])

    if(isLoading){
        return(
            <View>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if(!isLoading && trips.length === 0){
        return(
            <View style={styles.container}>
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
                    renderItem={(itemData => {
                        return(
                            <TripItem
                                onSelect={() => props.navigation.navigate('PlanningProcess', {screen: 'MainMapScreen', params: {doNotAddPlace: true}})}
                                onEdit={() => props.navigation.navigate('PlanningProcess', {screen: 'TripDescription'})}
                                eventName={itemData.item.name}
                                startDate={itemData.item.startDate}
                                endDate={itemData.item.endDate}
                            />
                        )
                    })}
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
        marginTop: 40,
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
        
        //borderColor: 'black', borderWidth: 1
        
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