'use strict'

import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import firebase from '@react-native-firebase/app'

import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';

import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { default as customMapping } from './custom-mapping.json';

import placeReducer from './store/reducers/place/place';
import tripReducer from './store/reducers/trip/trip';
import profileReducer from './store/reducers/profile/profile';
import authReducer from './store/reducers/auth/auth';
import encryptReducer from './store/reducers/auth/encryption';
import postReducer from './store/reducers/post/post'

import MainNavigator from './src/navigation/core/MainNavigator';

const rootReducer = combineReducers({
  places: placeReducer,
  trips: tripReducer,
  profile: profileReducer,
  auth: authReducer,
  posts: postReducer
  // encryption: encryptReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'profile', 'posts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer, 
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
let persistor = persistStore(store);

const theme = {...lightTheme, ...appTheme};

const App = () => {
  
  admob()
  .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
  })
  .then(() => {
      // Request config successfully set!
      console.log('Ad is requested');
      return;
  })
  .catch((err) => {console.log('Ads fail to load')})
  return(
    <ApplicationProvider 
      mapping={mapping} 
      theme={theme}
      customMapping={customMapping}
    >
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;

