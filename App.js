import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import IndexScreen from './src/screens/IndexScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import DetailScreen from './src/screens/DetailScreen';
import AccountScreen from './src/screens/AccountScreen';
import { Provider as AuthProvider } from './src/context/authContext'
import { setNavigator } from './src/navigationRef';
import MyUploadScreen from './src/screens/MyUploadScreen';
import MyPurchaseScreen from './src/screens/MyPurchaseScreen';

const navigator = createSwitchNavigator({
  Resolve: ResolveAuthScreen,
  loginflow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainflow: createBottomTabNavigator({
    Books: createStackNavigator({
      Index: IndexScreen,
      Create: CreateScreen,
      Detail: DetailScreen,
      Edit: EditScreen
    }),
    MyProfile: createStackNavigator({
      Account: AccountScreen,
      Myuplods: MyUploadScreen,
      MyPurchase: MyPurchaseScreen
    })
  })
})

const App = createAppContainer(navigator);

export default () => {
  return (
    <AuthProvider>
      <Provider store={store} >
        <App
          ref={
            (navigator) => {
              setNavigator(navigator)
            }
          } />
      </Provider>
    </AuthProvider>
  )
}