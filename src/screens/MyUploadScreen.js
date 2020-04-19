import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Context as AuthContext } from '../context/authContext'

const MyUploadScreen = () => {
  const { state, localUserId } = useContext(AuthContext)

  useEffect(() => {
    localUserId()
  }, [])
  return (
    <View>
      <Text>MyUploadScreen</Text>
      <Text>{state.userId} </Text>
    </View>
  )
}

export default MyUploadScreen
