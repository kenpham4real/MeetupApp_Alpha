// MeetUp 0

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button
} from 'react-native';



const PlanningScreen = props => {
    return(
        <View style={styles.container}>
            <Text>Trip planning</Text>
            {/* <Button 
                title='Next' 
                onPress={() => props.navigation.navigate('Testing')}    
            /> */}
            <Button 
                title='Next' 
                onPress={() => props.navigation.navigate('MainMapScreen')}    
            />
            <Button 
                title='Date Time' 
                onPress={() => props.navigation.navigate('TripDescription')}    
            />
            <Button 
            title='Demo 1' 
            onPress={() => props.navigation.navigate('DateTimeScreen')}    
            />
        </View>
    );
}

export default PlanningScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    }
}) 