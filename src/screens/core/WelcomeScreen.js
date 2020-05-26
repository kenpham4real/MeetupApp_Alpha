'use strict'

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    ImageBackground
} from 'react-native';
import {
    Layout
} from '@ui-kitten/components';
import Colors from '../../constants/Colors';


const WelcomeScreen = props => {
    return(
        <ImageBackground source={require('../../../assets/images/sunset.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.upper} />
                <View style={styles.middle}>
                    <Text style={styles.title}>Take care of your city and planet</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('PlanningProcess')}>
                        <Text style={styles.buttonText}>Start your journey</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    upper:{
        // borderColor: 'black', borderWidth: 1,
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    middle:{
        // borderColor: 'black', borderWidth: 1,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    title:{
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer:{
        // borderColor: 'black', borderWidth: 1,
        flex: 2
    },
    button:{
        borderRadius: 25,
        backgroundColor: Colors.third,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 8,
        shadowOpacity: 1,
        display: 'flex',
        height: 60,
        width: 250,
        borderRadius: 30,
        marginTop: 5,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 1,
        padding: 20
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
}) 