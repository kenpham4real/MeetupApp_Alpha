import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from '../app/AppNavigator';
import LogInStack from '../auth/LogInStack';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='AuthNavigator' headerMode="none">
                <Stack.Screen name="AppNavigator" component={AppNavigator} />
                <Stack.Screen name="AuthNavigator" component={LogInStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;