<<<<<<< HEAD
import React, { useState } from 'react'
=======
'use strict'

import React, { useState, useEffect, useCallback, useRef } from 'react'
>>>>>>> 7261981... Updating post interaction functionality
import {
  View,

  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  Keyboard
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import  moment from 'moment'
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';
import { 
  Layout,
  Card,
  Text,
  Input,
  Button
} from '@ui-kitten/components';
import { addTrip } from '../../../store/actions/trip/trip';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const TripDescription = (props) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');
  const [chosenMode, setChosenMode] = useState(null);  // chosenMode: true ? startDay : endDay

  const [chosenStartDate, setChosenStartDate] = useState('');
  const [chosenStartDate_unix, setChosenStartDate_unix] = useState(null);
  const [chosenEndDate, setChosenEndDate] = useState('');
  const [chosenEndDate_unix, setChosenEndDate_unix] = useState(null);
  const [eventName, setEventName] = useState('');
<<<<<<< HEAD
=======
  const [chosenTrip, setChosenTrip] = useState([]);
>>>>>>> 7261981... Updating post interaction functionality

  const showMode = (currentMode) => {
    setDatePickerVisibility(true);
    setMode(currentMode);
  };

  const showDayTimePicker = () => {
    showMode('datetime')
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (day) => { 
    // console.log('day', day);
    // console.log('day formatted', parseInt((new Date(moment(day).format()).getTime())/60000) );
    console.log('New confirm');
    hideDatePicker();
    if(chosenMode){
<<<<<<< HEAD
      setChosenStartDate(moment(day).format("MMMM Do YYYY, h:mm:ss a"))  
    }else{
      setChosenEndDate(moment(day).format("MMMM Do YYYY, h:mm:ss a"))
    };
  };

  const onEventNameHandler = (name) => {
    setEventName(name)
  };
=======
      setChosenStartDate(moment(day).format('MMMM Do YYYY, h:mm:ss a'));
      setChosenStartDate_unix(parseInt((new Date(moment(day).format()).getTime())/60000));
      console.log('chosenStartDate', chosenStartDate);
      console.log('choesnStartDate_unix', chosenStartDate_unix);
    }else{
      setChosenEndDate(moment(day).format('MMMM Do YYYY, h:mm:ss a'));
      setChosenEndDate_unix(parseInt((new Date(moment(day).format()).getTime())/60000));
      console.log('chosenEndDate', chosenEndDate);
      console.log('chosenEndDate_unix', chosenEndDate_unix);
    }
    
  };

  useEffect(() => {
    if(!chosenMode) checkValidDate(chosenStartDate_unix, chosenEndDate_unix)
  }, [chosenEndDate_unix])

  const checkValidDate = (start, end) => {
    console.log('Checking')
    console.log('chosenEndDate_unix', chosenEndDate_unix);
    console.log('chosenStartDate_unix', chosenStartDate_unix);
    if(start && end){
      ((end - start) >= 5) 
      ? (console.log('VALID')) 
      : (alert('Please travel aleast 5 minutes, life is worth explored!'), setChosenEndDate(''))
    }
  }

  const onEventNameHandler = (name) => {
    setEventName(name)
  };
  const places = useSelector(state => state.places.places);
  const trips = useSelector(state => state.trips.availableTrips);
  const {tripId} = props.route.params; 

  useEffect(() => {
    // Check if params: doEditPlace == true => editTrip
    
    const unsubscribe = props.navigation.addListener('focus', () => {
      if(props.route.params?.doEditTrip){
        let chosenTrip;
        for(const key in trips){
          if(trips[key].id === tripId){
            chosenTrip = trips[key]
          }
        }
        // console.log('Trips here', trips);
        // console.log('Chosen trip here', chosenTrip);
        setEventName(chosenTrip.name);
        setChosenStartDate(chosenTrip.startDate);
        setChosenEndDate(chosenTrip.endDate);
      }else{
        setEventName('');
        setChosenStartDate('');
        setChosenEndDate('');
        console.log('doEditTrip is false in useEffect');
      }
    });
>>>>>>> 7261981... Updating post interaction functionality


  return (
    <Layout style={styles.container}>
      <Card header={CustomHeader} style={styles.customHeader}/>
      <Layout style={styles.info}>
        <Layout style={styles.eventNameStyle}>
          <Layout style={{flex: 3, alignItems:'center', justifyContent: 'center'}}>
            <Input
              placeholder="My trip's name"
              onChangeText={onEventNameHandler}
              value={eventName}
              style={styles.input}
              textStyle={{fontSize: 20}}
            />
          </Layout>
          <Layout style={{alignItems: 'center', width: 50}}>
<<<<<<< HEAD
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={()=> Keyboard.dismiss()}>
=======
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={()=> {Keyboard.dismiss(); console.log('chosenStartDate', chosenStartDate)}}>
>>>>>>> 7261981... Updating post interaction functionality
              <Icon name="done" size={36} color={Colors.third}/>
            </TouchableOpacity>
          </Layout>
        </Layout>

            <Layout style={[styles.dateStyleBox, styles.input]}>
              <Layout style={{flex: 2, alignItems:'center'}}><Text style={styles.dateDisplayed}>{chosenStartDate}</Text></Layout>
                
              <Layout style={{flex: 1}}>
                <TouchableOpacity  style={[styles.button, styles.input]} onPress={() => {
                  setChosenMode(true);
                  showDayTimePicker()
                }}>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20}}>Start date</Text>
                </TouchableOpacity>
              </Layout>
            </Layout>

            <Layout style={[styles.dateStyleBox, styles.input]}>
              <Layout style={{flex: 2, alignItems:'center'}}>
                <Text style={styles.dateDisplayed}>{chosenEndDate}</Text>
              </Layout>
              <Layout style={{flex: 1}}>
                <TouchableOpacity style={[styles.button, styles.input]} onPress={() => {
                    setChosenMode(false);
                    showDayTimePicker()
                }}>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20}}>End date</Text>  
                </TouchableOpacity>  
              </Layout>
            </Layout>  

                <TouchableOpacity style={[styles.button, styles.input]} onPress={() => {
                    props.navigation.navigate('TripsListDetailScreen', {
                      final_eventName: eventName,
                      final_startDate: chosenStartDate,
                      final_endDate: chosenEndDate,
                      //final_startLocAddress: startLocation
                    })
                  }
                }>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20}}>Finish</Text>  
<<<<<<< HEAD
                </TouchableOpacity>  
            {/* </Layout> */}
=======
                </TouchableOpacity>
>>>>>>> 7261981... Updating post interaction functionality

            {isDatePickerVisible && (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={(day)  => {
                  handleConfirm(day)
                }}
                onCancel={hideDatePicker}
              />
            )}
        
      </Layout>
    </Layout>
  );
};

const CustomHeader = () => {
  return(
    <React.Fragment>
      <ImageBackground
          style={styles.headerImage}
          source={require('../../../assets/images/sunrise.jpg')}
        >
          <Layout style={styles.imageOverlay} >
            <Text category="h1" status="info" style={styles.headerText}>Style your trip</Text>
          </Layout>
        </ImageBackground>
    </React.Fragment>
  )
}

export default TripDescription;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  customHeader:{
    flex: 1
  },
  info:{
    flex: 3,
    //justifyContent: 'center',
    alignItems: 'center',

  },
  headerImage: {
    height: 200,
    width: WIDTH,

  },
  imageOverlay:{
    flex: 1, 
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    alignItems: 'center',

  },
  headerText: {
    marginTop: 30,
    color: 'white',
  },
  eventNameStyle:{
    flexDirection: 'row',
    height: 50,
    width: 350,
    marginVertical: 30,
    padding: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    // position: 'absolute'
    backgroundColor: 'white',
  },
  input:{
    
    shadowColor: 'black',
    elevation: 7,
    shadowRadius: 1,
    shadowOpacity: 1,
    borderRadius: 10,
    //height: 70
  },
  dateStyle:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  dateStyleBox:{

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
    padding: 5,
    width: 350,
    height: 100,
    backgroundColor: 'white',
  },
  dateDisplayed: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    alignSelf: 'center',
    margin: 10
  },

  button:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    margin: 5,
    padding: 3,
    backgroundColor: Colors.secondary
  },
})
<<<<<<< HEAD

TripDescription.navigationOptions = (navData) => {
  return{
    headerTitle: 'About your trip',
    headerRight: () => (
    
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Finish"
          iconName={Platform.OS === 'adroid' ? 'done-all' : 'done-all'}
          onPress={() => {
            navData.navigation.navigate('TripsListDetailScreen', {
              final_eventName: eventName,
              final_startDate: chosenStartDate,
              final_endDate: chosenEndDate,
              final_startLocAddress: startLocation
            })
          }}
        />
    </HeaderButtons>
  )
  }
}
=======
>>>>>>> 7261981... Updating post interaction functionality
