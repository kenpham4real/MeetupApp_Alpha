'use strict'

import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';


const TripItem = props => {
    return(
      <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Layout style={[styles.main, styles.extraStyle]}>
        <View style={[styles.extraStyle, styles.imageWrapper]}>
          <Image style={styles.image} source={require('../../assets/images/beach.jpg')} />
        </View>

        <Layout style={styles.infoContainer}>

          <Layout style={styles.title}>
            <Text style={styles.name}>{props.eventName}</Text>
          </Layout>

          <View style={styles.dateContainer}>

            <Layout style={styles.dateOverlay}>
              <Layout style={styles.date}>
                <Layout style={styles.icon}><Icon name='navigate-next' size={23} /></Layout>
                <Layout style={styles.dateTitleContainer}><Text style={styles.dateTitle}>{props.startDate}</Text></Layout>
              </Layout>
              <Layout style={styles.date}>
                <Layout style={styles.icon}><Icon name='navigate-before' size={23} /></Layout>
                <Layout style={styles.dateTitleContainer}><Text style={styles.dateTitle}>{props.endDate}</Text></Layout>
              </Layout>
            </Layout>

            <Layout style={styles.detailButton}>
              <TouchableOpacity onPress={props.onEdit} style={styles.button}>
                <Icon name='edit' size={23} color='grey' />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onShare} style={styles.button}>
                <Icon name='share' size={23} color='grey' />
              </TouchableOpacity>
            </Layout>
          </View>

        </Layout>
      </Layout>
    </TouchableOpacity>
    );
}

export default TripItem;

const styles = StyleSheet.create({
  placeItem: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    borderRadius: 10,
    paddingBottom: 10,
    marginVertical: 15,
    width: 300,
    height:430,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraStyle:{
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 1,
    shadowOpacity: 1,
  },
    imageWrapper:{
      marginHorizontal:10,
      marginTop:10,
      backgroundColor: 'white',
      flex: 2.5, 
      borderRadius: 10, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      height: '50%',
      borderRadius: 10,
      width: 280,
      alignSelf: 'stretch',
      
    },
    infoContainer: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      //paddingLeft: 10,
      paddingVertical: 5,
      width: 290
    },
    title:{
      // borderColor: 'black', borderWidth: 1,
      flex: 1,
      width: 290,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 20
    },
    name: {
      color: 'black',
      fontSize: 35,
      marginBottom: 5,
      fontWeight: 'bold',
      marginTop: 10
    },
    dateContainer:{
      // borderColor: 'black', borderWidth: 1,
      flex: 2,
      width: 290,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      
    },
    dateOverlay:{
      // borderColor: 'black', borderWidth: 1,
      flex: 2,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 10
    },
    date:{
      // borderColor: 'black', borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch'
    },
    dateTitle: {
      color: '#141f1f',
      fontSize: 17
    },
    icon:{
      // borderColor: 'black', borderWidth: 1,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    dateTitleContainer:{
      // borderColor: 'black', borderWidth: 1,
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 5
    },
    detailButton: {
      // borderColor: 'black', borderWidth: 1,
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button:{
      // borderColor: 'black', borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      height: 25,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: '#ebebe0',
      marginVertical: 3
    }
  });