'use strict'

import React from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    Text
} from 'react-native';
import {
    Layout
} from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/core/ProfileScreen';
import TripsListScreen from '../../screens/core/TripsListScreen';
import PostDescription from '../../screens/core/Post/PostDescription'
import PostView from '../../screens/core/Post/PostView';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();

const ProfileStack = (props) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerTransparent: true,
                    title: '', // TODO: Add user's name state
                    // headerLeft: () => (<Icon name='back' style={{marginLeft: 20}} size={23} onPress={() => props.navigation.goBack()} />)
                }}
                name='Profile' 
                component={ProfileScreen}
                initialParams={{isFetchPost: false}}
                />
            <Stack.Screen 
                name='TripsListScreenFromProfile' 
                component={TripsListScreen} 
            />
            <Stack.Screen 
                name='PostDescriptionStack' 
                component={PostDescription}
                options={{
                    headerShown: false,
                    
                }}
                
            />
            <Stack.Screen 
                name='PostView' 
                component={PostView}
                options={{
                    headerShown: false
                }}
                
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white'
    }
})
export default ProfileStack;