import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { bookDb } from '../actions/types';
import fireaBaseConfig from '../config/fireBaseConfig';
import { addData } from '../actions/actions';
import { Context as authContext } from '../context/authContext';
// import { deleteData } from '../actions/actions';

const IndexScreen = ({ navigation, data, addData }) => {
  const { state, localUserId } = useContext(authContext)


  useEffect(() => {
    localUserId()
    fireaBaseConfig.on('value', snap => {
      const books = snap.val().books;
      addData(books)
    })
  }, [])

  const { books } = data

  const deletion = (id) => {
    bookDb.child(id).remove();
    bookDb.child('books')
    // deleteData(item.id)
  }

  return (
    <View>
      <FlatList
        data={books}
        
        keyExtractor={books => books.id}
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
  },
  imageStyle: {
    alignSelf: 'center',
    width: 400,
    height: 250,
    marginVertical: 10,
    resizeMode:'contain'
  }
})

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, { addData })(IndexScreen)
