import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { deleteData } from '../actions/actions';

const IndexScreen = ({ navigation, data, deleteData }) => {
  console.log('DATA', data.books)
  const { books } = data
  return (
    <View>
      <FlatList
        data={books}
        keyExtractor={ books => books.id }
        renderItem={({ item }) => {
          console.log('ITEM :', item.id, item.title)
          return (
            <ScrollView
              showsVerticalScrollIndicator={false} >
              <View style={styles.row} >
                <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })} >
                  <Text style={styles.text} >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteData(item.id)} >
                  <Feather name='trash-2' style={styles.icon} />
                </TouchableOpacity>
              </View>
            </ScrollView>
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
        <Feather name='plus' size={30} style={{ marginHorizontal: 20 }} />
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
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey'

  }
})


const mapStateToProps = state => {
  return {
    data: state.data
  }
}


export default connect(mapStateToProps, { deleteData })(IndexScreen)
