import React from 'react';
import {
    Image,
    Button,
    StyleSheet
} from 'react-native';
import {
    Layout,
    Text,
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';

const ProfileScreen = (props) => {

    const profile = useSelector(state => state.profile.userProfile );
    return(
        <Layout style={styles.container}>
            <Text>Name: {profile[0].name}</Text>
            <Text>Avatar:</Text>
            <Image style={{height: 100, width: 100}} source={{uri: `${profile[0].avatar}`}} />
            <Text>Email: {profile[0].email}</Text>
            <Button title='Logging' onPress={() => props.navigation.navigate('Welcome')} />
        </Layout>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    }
})