import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';

const IndexScreen = ({ navigation, data }) => {
  // console.log('Index propstitile ', props)
  // console.log('titile', props.datas)
  return (
    <View>
      {/* <Text> {dataprops.id} </Text> */}
      <FlatList
        data={data}
        keyExtractor={data => data.id}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })} >
                <Text style={styles.text} >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Create')}
      >
        <Feather name='plus' size={30} />
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 10,

  },
  icon: {
    alignContent: 'center',
    fontSize: 30
  }
})


const mapStateToProps = state => {
  return {
    data: state.data
  }
}


export default connect(mapStateToProps)(IndexScreen)
