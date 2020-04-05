import React, {useEffect, useState} from 'react';
import {
    View,
    Image, 
    Animated, 
    Dimensions, 
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {
    Layout
} from '@ui-kitten/components';

import { quotes } from '../../data/quotes';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const LoadingScreen = (props) => {
    
    const [logoPosition] = useState(new Animated.Value(0));
    const [textPosition] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(logoPosition,{
            toValue: 1,
            duration: 2000
        }).start();
        Animated.timing(textPosition, {
            toValue: 1,
            duration: 4000
        }).start();
        setTimeout(() => {
            props.navigation.navigate('AuthNavigator')
        },7000);
        
    },[]);

    return(
        <ImageBackground source={require('../../assets/images/sitting.jpg')} style={styles.container}>
            <View style={styles.overLay}>
                <Animated.View style={[styles.logoContainer, {opacity: logoPosition}]}>
                    <Image style={styles.logo} source={require('../../assets/images/logo2.png')} />
                </Animated.View>
                <Animated.View style={[styles.quoteView, {opacity: textPosition}]}>
                    <Text style={styles.quote}>{quotes[Math.floor(Math.random()*100)]}</Text>
                </Animated.View>
            </View>
        </ImageBackground>
        
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    overLay:{
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoContainer:{
        // borderColor:'black', borderWidth:1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: 200,
        height: 200
    },
    quoteView:{
        // borderColor:'black', borderWidth:1,
        flex: 2,
        // justifyContent: 'center',
        alignItems: 'center',
        width: 350
        
    },
    quote:{
        marginTop: 45,
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Regular' ,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center'
    }
    
})