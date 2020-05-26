'use strict'

import {StyleSheet} from 'react-native';

const mainButton = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 8,
        shadowOpacity: 1,
        display: 'flex',
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 1,

    },
});

export default mainButton;
