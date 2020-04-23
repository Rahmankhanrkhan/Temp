import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Spacer from '../component/Space';
import { Context as AuthContext } from '../context/authContext';
import { bookDb } from '../actions/types';
import fireaBaseConfig from '../config/fireBaseConfig';
import { addData } from '../actions/actions';

const DetailScreen = ({ navigation, data, addData }) => {
  const { state } = useContext(AuthContext)

  const id = navigation.getParam('id')
  const { books } = data
  const detail = books.find(info => info.id === id)
  // console.log('detai', detail)
  const title = detail.title ? detail.title : <Text>No Data</Text>
  const author = detail.author ? detail.author : <Text>No Data</Text>
  const url = detail.url ? detail.url : null
  const userId = detail.userId ? detail.userId : null
  const uploaderId = userId
  const buyerId = detail.buyerId ? detail.buyerId : null
  console.log('userID, BuyerID:::', userId, state.userId, buyerId)

  const buySubmit = async (state) => {
    const { userId } = state
    const buyerId = userId
    // console.log('USERID IN DETAILS', userId)
    // console.log('DETAILS', detail)
    const elements = { ...detail, buyerId }
    // console.log('ELEMENTS DETAILS::', elements)
    await bookDb.child(id).set(elements)
    await fireaBaseConfig.on('value', snap => {
      const books = snap.val().books
      addData(books)
    })
  }
  return (
    <View>
      <Spacer>
        <Image
          source={{ uri: url }}
          style={styles.imageStyle}
        />
        {(uploaderId !== state.userId) && !buyerId ?
          (<Button
            color='green'
            title='Purchase'
            onPress={() => buySubmit(state)}
          />)
          : <Button
            title = 'SOLD OUT'
            color = 'red'
          />}
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

export default connect(mapStateToProps, { addData })(DetailScreen)
