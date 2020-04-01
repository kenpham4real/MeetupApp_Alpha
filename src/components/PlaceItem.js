import React from 'react';
import { View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback
 } from 'react-native';
import {
  Layout, Card,
} from '@ui-kitten/components';

const PlaceItem = props => {
  return (
    
      <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
        <Layout style={styles.main}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <Layout style={styles.infoContainer}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.address}>{props.address}</Text>
          </Layout>
        </Layout>
      </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  main:{
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 1,
    shadowOpacity: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 15,
    paddingHorizontal: 30,
    width: 350,
    flexDirection: 'row'
  },
  placeItem: {
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    flex: 1,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    // shadowColor: 'black',
    // elevation: 7,
    // shadowRadius: 1,
    // shadowOpacity: 1,
    // borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 5,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  name: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16,
  }
});

export default PlaceItem;
