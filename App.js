import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import IndexScreen from './src/screens/IndexScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import DetailScreen from './src/screens/DetailScreen';

const navigator = createStackNavigator({
  Index: IndexScreen,
  Create: CreateScreen,
  Edit: EditScreen,
  Detail: DetailScreen

},
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Books'
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}