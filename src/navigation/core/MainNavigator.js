import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from '../app/AppNavigator';
import LogInStack from '../auth/LogInStack';
import LoadingSreen from '../../screens/LoadingScreen'

const Stack = createStackNavigator();

const MainNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoadingScreen' headerMode="none">
                <Stack.Screen name='LoadingScreen' component={LoadingSreen} />
                <Stack.Screen name="AuthNavigator" component={LogInStack} />
                <Stack.Screen name="AppNavigator" component={AppNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;