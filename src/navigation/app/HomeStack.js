'use strict'

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'

import WelcomeScreen from '../../screens/core/WelcomeScreen';

const Stack = createStackNavigator();


const WelcomeStackScreen = (props) => {
    return(
        <Stack.Navigator headerMode='float'  >
            <Stack.Screen 
                name='WelcomeStackScreen' 
                component={WelcomeScreen} 
                
                options={{
                    headerTransparent: true,
                    headerLeft: () => (<Icon style={{marginHorizontal: 30, marginTop: 30}} color='white' name='menu' size={30} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}/>),
                    title: ''
                  }}
            />
        </Stack.Navigator>
    );
};

export default WelcomeStackScreen;