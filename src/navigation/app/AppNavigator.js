import React from 'react'
import { Image, StyleSheet  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter } from '@ui-kitten/components';

import ProfileStack from './ProfileStack';
import TripsListScreen from '../../screens/core/TripsListScreen';
import StackNavigators from './StackNavigators';
import WelcomeStackScreen from './HomeStack';

const Drawer = createDrawerNavigator();

const drawerData = [
    { title: 'Home', titleStyle: {fontSize: 16}},
    { title: 'Your trips', titleStyle: {fontSize: 16} },
  ];
const Profile = (props) => (
    <Image {...props} style={{height:70, width:70, borderRadius:35}} />
);
const Header = (props) => (
    <DrawerHeaderFooter
        title='Robert Pham'
        description='A man with a dream of inspiring others'
        icon={Profile}
        onPress={() => props.navigation.navigate('Profile')}
        style={styles.text}
        titleStyle={{flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center', paddingTop: 5}}
        descriptionStyle={{flex: 1, fontSize: 15,justifyContent: 'center', alignItems: 'center'}}
    />
);
const DrawerContent = ({navigation,state, progress}) => {
    
    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <UIKittenDrawer
            data={drawerData}
            selectedIndex={state.index}
            onSelect={onSelect}
            header={Header}
            
        />
    );
};

  
const AppNavigator = () => {

    return(
            <Drawer.Navigator
                initialRouteName='Welcome'
                statusBarAnimation='slide'
                drawerContent={props => 
                    <DrawerContent {...props} />}>
                <Drawer.Screen name='Welcome' component={WelcomeStackScreen}  />
                <Drawer.Screen name='TripsListScreen' component={TripsListScreen} />
                <Drawer.Screen name='PlanningProcess' component={StackNavigators} />
                <Drawer.Screen name='ProfileScreen' component={ProfileStack} />
            </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize: 50,
    }
})

export default AppNavigator;
