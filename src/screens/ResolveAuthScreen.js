import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Context as AuthContext } from '../context/authContext';

const ResolveAuthScreen = () => {
  const { localSignin } = useContext(AuthContext)

  useEffect(() => {
    localSignin();
  }, []);

  return null
}

export default ResolveAuthScreen
