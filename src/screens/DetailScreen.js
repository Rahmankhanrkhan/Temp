import React from 'react'
import { View, Text ,TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'

const DetailScreen = ({ navigation, data }) => {
  const id = navigation.getParam('id')
  const detail = data.find(data => data.id === id)
  return (
    <View>
      <Text>DetailScreen</Text>
      {/* <Text>{id}  </Text> */}
      <Text>{detail.id} </Text>
      <Text>{detail.title} </Text>
      <Text>{detail.author} </Text>
    </View>
  )
}

DetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit',{id:navigation.getParam('id')} )}
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
