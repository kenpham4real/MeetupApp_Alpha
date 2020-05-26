'use strict'

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MainMap from '../../screens/core/MainMap';
import TripDescription from '../../screens/core/TripDescription';
import TripsListDetailScreen from '../../screens/core/TripsListDetailScreen';
import TripsListScreen from '../../screens/core/TripsListScreen';
import Icon from 'react-native-vector-icons/Feather'

const Stack = createStackNavigator();

const StackNavigator = (props) => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='MainMapScreen' component={MainMap} />
            <Stack.Screen name='TripDescription' component={TripDescription} />
            <Stack.Screen name='TripsListDetailScreen' component={TripsListDetailScreen} />
            <Stack.Screen
                name='TripsListScreen' 
                component={TripsListScreen} 
                options={{
                    headerLeft: () => (<Icon style={{marginHorizontal: 30, marginTop: 30}} color='white' name='menu' size={30} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}/>),
                    title:'Something'
                    }}
            />
        </Stack.Navigator>
    );
};
export default StackNavigator;