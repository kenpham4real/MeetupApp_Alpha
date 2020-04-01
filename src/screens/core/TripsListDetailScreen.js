import React, { useState } from 'react';
import {
    FlatList,
    Text,
    StyleSheet,
    Button,
    View,
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

import PlaceItem from '../../components/PlaceItem';
import CarUI from '../../components/UI/Card';
import {addTrip} from '../../../store/actions/trip/trip'
import { TouchableOpacity } from 'react-native-gesture-handler';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const TripsListDetailScreen = (props) => {

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
        dispatch(addTrip(final_eventName, final_startDate, final_endDate, places))
        props.navigation.navigate('TripsListScreen');
    }

    return(
        <ImageBackground source={require('../../../assets/images/beach.jpg')} style={styles.container}>
            <View style={styles.info}>
                <View style={styles.tripName}>
                    <View style={styles.header}><Text style={styles.title}> {final_eventName}</Text></View>
                    <View style={styles.buttonWrapper}>
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
        justifyContent: 'center',
        alignItems: 'center'
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
        
    },
    list: {
        flex: 3,
    }
});

