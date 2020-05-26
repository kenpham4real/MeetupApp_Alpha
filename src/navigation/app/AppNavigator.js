'use strict'

import React from 'react'
import { Image, StyleSheet  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Divider } from '@ui-kitten/components';

import ProfileStack from './ProfileStack';
import TripsListScreen from '../../screens/core/TripsListScreen';
import StackNavigators from './StackNavigators';
import WelcomeStackScreen from './HomeStack';
import PostDescription from '../../screens/core/Post/PostDescription'

<<<<<<< HEAD
=======
import Colors from '../../constants/Colors'
import * as authActions from '../../../store/actions/auth/auth'
import { removeProfile } from '../../../store/actions/profile/profile';

>>>>>>> 7261981... Updating post interaction functionality
const Drawer = createDrawerNavigator();

const drawerData = [
    { title: 'Home', titleStyle: {fontSize: 16}},
    { title: 'Your trips', titleStyle: {fontSize: 16} },
<<<<<<< HEAD
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
    
=======
];

const Header = (props) => {
    return(
        <React.Fragment>
            <DrawerHeaderFooter
                
                title={props.name}
                description='A man with a dream of inspiring others'
                icon={() => (
                    <View style={{height:60, width:60, borderRadius:30, marginVertical: 10, borderColor: 'black', borderWidth: 1}}><Image style={{flex: 1}} source={{uri: props.avatar}} /></View>
                )}
                onPress={props.profileScreenNavigation} // TODO: Navigate to Profile screen
                style={styles.text}
                titleStyle={{ fontSize: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}
                descriptionStyle={{flex: 1, fontSize: 15,justifyContent: 'center', alignItems: 'center'}}
            />
            <Divider/>
        </React.Fragment>
    )
};
const DrawerContent = ({navigation,state}) => {  
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.userProfile);
>>>>>>> 7261981... Updating post interaction functionality
    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <UIKittenDrawer
            data={drawerData}
            selectedIndex={state.index}
            onSelect={onSelect}
<<<<<<< HEAD
            header={Header}
            
=======
            header={() => (
                <Header
                    name={profile.userName}
                    avatar={profile.userAvatar}
                    profileScreenNavigation={() => {navigation.navigate('ProfileScreen')}}
                />
            )}
            footer={() => (
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button title='Logout' color={Colors.primary} onPress={() => {
                        dispatch(authActions.logout())
                        dispatch(removeProfile())
                        navigation.navigate('AuthNavigator')
                    }} />
                </SafeAreaView>
            )}
>>>>>>> 7261981... Updating post interaction functionality
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
                <Drawer.Screen name='TripsListScreen' component={TripsListScreen}  />
                <Drawer.Screen name='PlanningProcess' component={StackNavigators} />
                <Drawer.Screen name='ProfileScreen' component={ProfileStack} />
                <Drawer.Screen name='PostDescriptionDrawer' component={PostDescription} />
            </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize: 50,
    }
})

export default AppNavigator;
