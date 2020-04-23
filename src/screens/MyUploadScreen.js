import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native'
import { Context as AuthContext } from '../context/authContext'
import { connect } from 'react-redux'

const MyUploadScreen = ({navigation, data }) => {
  const { state } = useContext(AuthContext)

  const { books } = data

  const details = books.filter(info => info.userId === state.userId)

  return (
    <View>
      <Text>MyUploadScreen</Text>
      <Text>{state.userId} </Text>
      <FlatList
        data={details}
        inverted
        keyExtractor={details => details.id}
        renderItem={({ item }) => {
          return (
            <ScrollView
              hideVerticalScrollIndicator={true} >
              <View  >
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor="white"
                  onPress={() => navigation.navigate('Detail', { id: item.id })}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={styles.imageStyle}
                  />
                </TouchableHighlight>
              </View>
            </ScrollView>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    width: 400,
    height: 250,
    marginVertical: 20,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(MyUploadScreen)
