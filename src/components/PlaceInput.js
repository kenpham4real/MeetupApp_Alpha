'use strict'

import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    FlatList
} from 'react-native';
import axios from 'axios';
import _ from 'lodash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const initialState = {
        predictions: [],
        destinationInput: '',
};

class PlaceInput extends React.Component{

    constructor(props, id){
        super(props);
        this.id = id;
        this.state={
            predictions: [],
            destinationInput: '',
        }
        this.getPlaces = this.getPlaces.bind(this);
        this.getPlacesDebounced = _.debounce(this.getPlaces, 1000);
        this.setDestination = this.setDestination.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.doCleanState !== prevProps.doCleanState){
            this.setState({
                destinationInput: this.props.updateClean(''),
                predictions: [],
            })
        }
    }

    async getPlaces(input){
        const { userLatitude, userLongitude } = this.props;
        const result = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDqDDKVm8bekXwmqpYkgoRMTCsd8vTCxc8&input=${input}&location=${userLatitude},${userLongitude}&radius=2000`
        );
        this.setState({
            predictions: result.data.predictions
        });
    }

    setDestination(main_text, place_id){
        Keyboard.dismiss();
        
        this.setState({
            destinationInput: main_text,
            predictions: [],
        })
        this.props.showDirectionOnMap(place_id);
    }

    render() {
        // console.log(this.state);
        const predictions = this.state.predictions.map(prediction => {
            const { id, structured_formatting, place_id } = prediction;
            return(
                <TouchableOpacity 
                    key={id} 
                    onPress={() => this.setDestination(structured_formatting.main_text, place_id)}    
                >
                    <View style={styles.suggestion}>
                        <Text style={styles.mainText}>{structured_formatting.main_text}</Text>
                        <Text style={styles.secText}>{structured_formatting.secondary_text}</Text>
                    </View>
                </TouchableOpacity>
            );
        } )

        return (
            <View style={{flex: 1, flexDirection: 'column'}} key={this.props.id}>
                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{fontSize: 8}}>{'\u25A0'}</Text>
                    </View>
                    <View style={{flex: 4, height: 50}}>
                        <TextInput
                            key={this.id}
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={styles.inputStyle}
                            placeholder='Search your places'
                            onChangeText={(input) => {
                                this.setState({destinationInput: input});
                                this.getPlacesDebounced(input);
                            }}
                            value={this.props.displayDefaultValue ? this.props.defaultValue : this.state.destinationInput}
                            //defaultValue={}
                            // defaultValue="Your location"
                            />
                    </View>
                    <View style={styles.rightCol}>
                            <TouchableOpacity onPress={() => this.props.onDelete(this.props.id)}>
                                <Icon name='delete' size={25} style={{alignSelf: 'center'}} />
                            </TouchableOpacity>
                    </View>
                    
                </View>
                {predictions}
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: 'row',
        // height: (HEIGHT - 685),
        height: (HEIGHT/3.5)/3.5,
        width: (WIDTH-70),
        marginTop: 20,
        padding: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 7,
        shadowRadius: 1,
        shadowOpacity: 1,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf:'center',
    },
    inputStyle:{
        fontFamily: 'sans-serif-thin', 
        fontSize: 16, 
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5
    },
    suggestion:{
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 0.5,
        width: (WIDTH-70),
        alignSelf: 'center'
    },
    secText:{
        color: '#777'
    },
    mainText:{
        color: '#000'
    },
    rightCol:{
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
    },
})

export default PlaceInput;