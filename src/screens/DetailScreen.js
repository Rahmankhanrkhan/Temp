import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Spacer from '../component/Space';

const DetailScreen = ({ navigation, data }) => {
  const id = navigation.getParam('id')
  const detail = data.find(data => data.id === id)
  return (
    <View>
      <Spacer>
        <Text>Title :</Text>{
          detail.title ?
            <Text>{detail.title} </Text> :
            <Text>No data</Text>
        }
        <Text>Author :</Text>
        {
          detail.author ?
            <Text>{detail.author} </Text> :
            <Text>No data</Text>
        }
        <Text>Book id :</Text>
        <Text>{detail.id} </Text>
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
        <FontAwesome name='pencil-square-o' size={30} />
      </TouchableOpacity>

    )
  }
}



const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(DetailScreen)
