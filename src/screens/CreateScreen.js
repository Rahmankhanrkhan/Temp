import React, { useState } from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';
import { set } from 'react-native-reanimated';
import { bookDb } from '../actions/types';
import fireaBaseConfig, { storage } from '../config/fireBaseConfig';
import { imageUrl } from '../actions/wordAction';


const CreateScreen = ({ navigation, data, word, addData, imageUrl }) => {
  // console.log('ctr svrn', word.url)

  const uploadImage = async (uri, id) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = storage.ref().child('images/' + id)
    return ref.put(blob)
  }
  const updateBooks = () => {
    // console.log('eELEMENTS in UPDate',elements)
    fireaBaseConfig.on('value', snap => {
      console.log('dbData', snap.val().books)
      const books = snap.val().books
      console.log('BOOKDS FROM DB:', books)
      addData(books)
      navigation.pop()
    })
  }

  const onSubmit = (title, author, uri) => {
    const id = new Date().getTime()
    uploadImage(uri, id).then(() => {
      storage.ref().child('images/' + id)
        .getDownloadURL().then((url) => {
          alert('url received')
          console.log('DB URL', url)
          const elements = {
            title, author, id, url
          }
          bookDb.child(id).set(elements)
          updateBooks()
        })
    }
    )


  }

  return (
    <View>
      <FormField
        buttonText='Add'
        onSubmit={onSubmit}
      />
    </View>
  )
}

const mapStateToProps = state => {
  return {
    data: state.data,
    word: state.word
  }
}
export default connect(mapStateToProps, { addData, imageUrl })(CreateScreen)