import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {enableScreens} from 'react-native-screens';

import TripItem from '../../components/TripItem';
import PlaceItem from '../../components/PlaceItem';
import { Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardUI from '../../components/UI/Card';
import Colors from '../../constants/Colors'
import { unLoadPlace } from '../../../store/actions/place/place';

enableScreens();

const {width}=Dimensions.get('window');

const TripsListScreen = props => {

    const trips = useSelector(state => state.trips.trips);
    const dispatch = useDispatch();

    return(
        <Layout style={styles.container}>
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