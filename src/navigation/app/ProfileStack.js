import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/core/ProfileScreen';
import Icon from 'react-native-vector-icons/AntDesign';
const Stack = createStackNavigator();

const ProfileStack = (props) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerTransparent: true,
                    title: '',
                    headerLeft: () => (<Icon name='back' size={23} onPress={() => props.navigation.goBack()} />)
                }} 
                name='Profile' 
                component={ProfileScreen} />
        </Stack.Navigator>
    );
}

export default ProfileStack;