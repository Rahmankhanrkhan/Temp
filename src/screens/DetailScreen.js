import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Spacer from '../component/Space';

const DetailScreen = ({ navigation, data }) => {
  
  const id = navigation.getParam('id')
  const { books } = data
  const detail = books.find(info => info.id === id)
  const title = detail.title ? detail.title : <Text>No Data</Text>
  const author = detail.author ? detail.author : <Text>No Data</Text>
  const url = detail.url ? detail.url : null

  return (
    <View>
      <Spacer>
        <Image
          source={{ uri: url }}
          style={styles.imageStyle}
        />
        <Text style={styles.text} >Book Title  : {title} </Text>
        <Text style={styles.text} >Author Name : {author} </Text>
      </Spacer>
    </View>
  )
}

DetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}
      >
        <FontAwesome name='pencil-square-o' size={30} style={{ marginHorizontal: 20 }} />
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  imageStyle: {
    alignSelf: 'center',
    width: 400,
    height: 200,
    marginVertical: 20,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(DetailScreen)
