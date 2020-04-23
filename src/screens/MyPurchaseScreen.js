import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/authContext'
import { connect } from 'react-redux'
import { FlatList, TouchableHighlight, ScrollView } from 'react-native-gesture-handler'

const MyPurchaseScreen = ({ navigation, data }) => {
  const { books } = data
  const { state } = useContext(AuthContext)

  const details = books.filter(book => book.buyerId === state.userId)

  return (
    <View>
      <FlatList
        data={details}
        inverted
        keyExtractor={details => details.id}
        renderItem={({ item }) => {
          return (
            <ScrollView
              hideVerticalScrollIndicator={true}
            >
              <View>
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
    marginVertical: 10,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(MyPurchaseScreen)
