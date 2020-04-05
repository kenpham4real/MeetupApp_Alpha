import React from 'react';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'

import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { default as customMapping } from './custom-mapping.json';

import placeReducer from './store/reducers/place/place'
import tripReducer from './store/reducers/trip/trip'
import profileReducer from './store/reducers/profile/profile';

import MainNavigator from './src/navigation/core/MainNavigator';

const rootReducer = combineReducers({
  places: placeReducer,
  trips: tripReducer,
  profile: profileReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const theme = {...lightTheme, ...appTheme};

const App = () => {
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

