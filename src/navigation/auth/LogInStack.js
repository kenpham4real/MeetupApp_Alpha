import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import FB_LogIn from '../../screens/auth/FB_LogIn';
import LoginScreen from '../../screens/auth/LoginScreen';

const Stack = createStackNavigator();

const LogInStack = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>
    );
};
export default LogInStack;
