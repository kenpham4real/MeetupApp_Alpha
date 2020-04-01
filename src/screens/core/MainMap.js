import React from 'react';
import { 
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    PermissionsAndroid,
    Platform, 
    View,
    Button,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import PlaceInput from '../../components/PlaceInput';
import Colors from '../../constants/Colors'
import {GOOGLE_API_KEY} from '../../constants/keys/APIs/Google';
import { addPlace, unLoadPlace } from '../../../store/actions/place/place';

import axios from 'axios';
import PolyLine from '@mapbox/polyline';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



const INCREMENT = 1;
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const initialState = {
    hasMapPermission: false,
    _userLocationDisplayed: null,
    userLatitude: 0,
    userLongitude: 0,
    initial_UserLatitude: 0,
    initial_UserLongitude: 0,
    userLocationAddress: '',

    destination: [],
    destinationName: [],
    destinationAddress: [],
    destinationCoords: [],
    destinationImageUri: [],

    numOfInput:[0,1],
    counter: 1,
    wayPoints: [],
    markers: [],

    doCleanState: 'no'
};
const cleanUpState = {
    hasMapPermission: false,

    destination: [],
    destinationName: [],
    destinationAddress: [],
    destinationCoords: [],
    destinationImageUri: [],

    numOfInput:[0,1],
    counter: 1,
    wayPoints: [],
    markers: [],

    doCleanState: 'yes'
}

class MainMap extends React.Component{

    constructor(props){
        super(props);

        this.state = initialState;

        this.map = React.createRef();

        this._requestUserLocation = this._requestUserLocation.bind(this);
        this.showDirectionOnMap = this.showDirectionOnMap.bind(this);
        this.getPlaceDetails = this.getPlaceDetails.bind(this);
        this.reverseGeocoding_forUserLocation = this.reverseGeocoding_forUserLocation.bind(this);

        this.onAddSearch = this.onAddSearch.bind(this);
        this.onDeleteSearch = this.onDeleteSearch.bind(this);
        
        this.addPlaceHandle = this.addPlaceHandle.bind(this);
        // this.checkDuplicatedDestination = this.checkDuplicatedDestination.bind(this);
        // this.checkDuplicatedDestinationHandler = this.checkDuplicatedDestinationHandler.bind(this);
    };
    
    UNSAFE_componentWillMount(){
        this._requestUserLocation();
        console.log('userlocation address', this.state.userLocationAddress)
    };

    componentDidMount(){
        console.log('Hello',this.props);
        console.log('This is state', this.state);
        //this._requestUserLocation();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState(cleanUpState);

        })
    };

    componentDidUpdate(prevState) {
        (this.props.route.params !== prevState.route.params)
        ? (
            cleanUpState.userLatitude = this.state.initial_UserLatitude, 
            cleanUpState.userLongitude = this.state.initial_UserLongitude, 
            this.getUserLocation(),
            console.log('COMPONENT DID UPDATE', this.state.initial_UserLongitude)
        )
        : null;
    };
    componentWillUnmount(){
        Geolocation.clearWatch(this.watch_location_id);
        this._unsubscribe();
        console.log('This is unmounted')
    };
    
    // Get user current location
    getUserLocation() {
        this.setState({
            hasMapPermission: true,
            hasUserLocation: true
        });
        this.watch_location_id = Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    userLatitude: position.coords.latitude,
                    userLongitude: position.coords.longitude,
                    initial_UserLatitude: position.coords.latitude,
                    initial_UserLongitude: position.coords.longitude,
                    _userLocationDisplayed: 'Your location'
                });
                console.log('user location DONE');
                this.reverseGeocoding_forUserLocation();
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            
        );
        
    };

    // Ask user permission for current location
    async _requestUserLocation(){
        try{
            if(Platform.OS === 'android'){
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    console.log('PERMISSION GRANTED');
                    this.getUserLocation();
                }else{
                    this.getUserLocation();
                };
            };
        } catch(err){
            console.warn(err);
            throw err;
        };
    };

    // Request the Directions API from Google
    async showDirectionOnMap(placeId){
        const { userLatitude, userLongitude, wayPoints, markers } = this.state;
        try{
            let  result = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?key=${GOOGLE_API_KEY}&origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}`
            );

            //console.log(`This is result.data`, result.data);
            let points = PolyLine.decode(
                result.data.routes[0].overview_polyline.points
            );

            let latLng = points.map(point => ({
                latitude: point[0],
                longitude: point[1],
            }));
            this.setState({
                destination: placeId,
                destinationCoords: [...this.state.destinationCoords, latLng],
                // wayPoints: [...wayPoints, latLng],
                markers: [...markers, latLng],
            });
            this.map.current.fitToCoordinates(latLng, {
                edgePadding:{
                    top: 40,
                    bottom: 40,
                    left: 40,
                    right: 40
                }
            });

        } catch(err){
            console.error(err);
            throw err;
        };
        this.onAddSearch();
        
    };

    // Get the formatted_address & name from Google Places API
    async  getPlaceDetails(){
        const {destination, initial_UserLatitude, initial_UserLongitude} = this.state
        try{
            let result = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${destination}&fields=address_component,adr_address,formatted_address,geometry,photo,place_id,name`
            );

            let locationDecoded = result.data.result;
            this.setState({
                userLatitude: locationDecoded.geometry.location.lat,
                userLongitude: locationDecoded.geometry.location.lng,
                destinationAddress: [...this.state.destinationAddress, locationDecoded.formatted_address],
                destinationName: [...this.state.destinationName, locationDecoded.name],
                // destinationImageUri: [this.state.destinationImageUri, locationDecoded.]
            });;
            let destinationNameInstance = [];
            let destinationAddressInstance = [];
            
            destinationNameInstance = locationDecoded.name;
            destinationAddressInstance = locationDecoded.formatted_address;
            
            this.addPlaceHandle(destinationNameInstance, destinationAddressInstance);

        }catch(err) {
            console.log(err);
            throw err;
        };
    };

    // Get the formatted_address for the user location's latLng
    async reverseGeocoding_forUserLocation(){
        const {initial_UserLatitude, initial_UserLongitude} = this.state
        try{
            let result = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${initial_UserLatitude},${initial_UserLongitude}&key=${GOOGLE_API_KEY}`
            );

            let locationDecoded = result.data.results[0].formatted_address;

            this.setState({
                userLocationAddress: locationDecoded
            })
            this.addPlaceHandle(this.state._userLocationDisplayed, this.state.userLocationAddress);
            console.log('user location is dispatched', this.state.userLocationAddress)
        }catch(err) {
            console.log(err);
            throw err;
        };
    };

    // Check if the array of destionation name and address have duplicated values
    // checkDuplicatedDestination(arr){
    //     let newArr = [];
    //     let temp;
    //     let j;
    //     let i;
    //     for(i = 0; i < arr.length; i++){
    //         for(j = i+1; j <= arr.length; j++){
    //             if(arr[i] !== arr[j]){
    //                 newArr.push(arr[i]);
    //                 break;
    //             }else if(arr[i] === arr[j]){
    //                 continue;
    //             }
    //         }
    //         temp = j;
    //         i = temp - 1;
    //     }
    //     return newArr;
    // }

    // Handle the above function: checkDuplicatedDestionation, by setting state for them with the new checked array
    // checkDuplicatedDestinationHandler(){
    //     const desNameArr = this.state.destinationName;
    //     const desAddressArr = this.state.destinationAddress;
    //     if(desNameArr.length > 1 && desAddressArr.length > 1){
    //         this.setState({
    //             destinationName: this.checkDuplicatedDestination(desNameArr),
    //             destinationAddress: this.checkDuplicatedDestination(desAddressArr)
    //         })
    //     }else{
    //         return;
    //     }
        
    // }

    // Adding a search bar
    onAddSearch(){
        this.setState((state) => ({
            counter: state.counter + INCREMENT,
            numOfInput: [...state.numOfInput, state.counter],
        }));
        this.getPlaceDetails();
    };

    // Delete a search bar
    onDeleteSearch(inputId){
        // const items = this.state.numOfInput.filter(item => item !== inputId);
        const desName_Output = this.onDeleteLocation(this.state.destinationName, inputId);
        const desAddress_Output = this.onDeleteLocation(this.state.destinationAddress, inputId);
        const numOfInput_Output = this.onDeleteLocation(this.state.numOfInput, inputId);

        this.setState({
            numOfInput: numOfInput_Output,
            destinationName: desName_Output,
            destinationAddress: desAddress_Output
        });
    };

    // TODO: Fix this since it hasn't worked
    // Delete the destination name and address at the same tim with deleting the search bar (if it was searched)
    onDeleteLocation(locInput, inputId){
        const elements = locInput.filter(el => el !== inputId);
        return elements;
    }

    // Hide keyboard when tapping outside the keyboard
    hideKeyboard(){
        Keyboard.dismiss();
    };

    // Dispatch a place
    addPlaceHandle(name, address){
        this.props.addingPlace(name, address);
    }

    render(){
        const {container, map, listOfSearchBars, buttonView, button, next} = styles
        const { destinationCoords, userLatitude, userLongitude, initial_UserLatitude, initial_UserLongitude } = this.state;
        let polyline = null;
        let marker = null;
        if(destinationCoords.length > 0){
            polyline = this.state.destinationCoords.map((desCoord) => {
                return (
                        <Polyline 
                            coordinates={desCoord}
                            strokeWidth={4}
                            strokeColor='#000'
                        />
                );
            });
            marker = this.state.markers.map((markerId) => {
                return(
                    <Marker coordinate={markerId[markerId.length - 1]}/>
                );
            });
        };
        //if(this.state.hasMapPermission === true){
            return(
                <TouchableWithoutFeedback onPress={this.hideKeyboard} >
                    <View style={container} >
                        
                        <MapView
                            ref={this.map}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            
                            style={map}
                            region={{
                                latitude: userLatitude,
                                longitude: userLongitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            
                        >
                            {polyline}
                            {marker}
                        </MapView>
                        <View style={listOfSearchBars}>
                            
                            <FlatList
                                data={this.state.numOfInput}
                                keyExtractor={(item, index) => item}
                                renderItem={({itemData,index}) => {
                                    return(
                                        <PlaceInput
                                            id={itemData}
                                            defaultValue={this.state._userLocationDisplayed}
                                            displayDefaultValue={!index}
                                            onDelete={this.onDeleteSearch}
                                            showDirectionOnMap={this.showDirectionOnMap}
                                            userLatitude={userLatitude}
                                            userLongitude={userLongitude}
                                            doCleanState={this.state.doCleanState}
                                            updateClean={text => this.setState({doCleanState: text})}
                                        />
                                    )
                                }}
                            />
                        </View>

                        <View style={buttonView}>
                            <TouchableOpacity style={button} onPress={() => {
                                
                                this.props.navigation.navigate('TripDescription', {
                                    startLocation: this.state.userLocationAddress,
                                    destinationNameParam: this.state.destinationName,
                                    destinationAddressParam: this.state.destinationAddress
                                });
                            }}>
                                <Text style={styles.next}>Style your trip!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        
    }
    
//}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    listOfSearchBars:{
        height: HEIGHT/3.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    buttonView:{
        width: 200,
        height: 40,
        backgroundColor: Colors.fifth,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 450
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    next: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
});

// const mapStateToProps = state => {
//     return{
//         places: state.places.places
//     };
// };

const mapDispatchToProps = (dispatch) => ({
    addingPlace: (_name, _address) => dispatch(addPlace(_name, _address)),
    onPlacesUnload: () => dispatch(unLoadPlace())
})

export default connect(null, mapDispatchToProps)(MainMap)