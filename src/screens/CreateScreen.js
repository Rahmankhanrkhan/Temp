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
  console.log('ctr svrn', word.url)

  const uploadImage = async (uri, id) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = storage.ref().child('images/' + id)
    return ref.put(blob)
  }
  const updateBooks = () => {
    fireaBaseConfig.on('value', snap => {
      console.log('dbData', snap.val().books)
      const books = snap.val().books
      console.log('BOOKDS FROM DB:', books)
      addData(books)
    })
  }

  const onSubmit = (title, author, uri) => {
    const id = new Date().getTime()
    const elements = {
      title, author, id
    }
    uploadImage(uri, id).then(() => {
      storage.ref().child('images/' + id)
        .getDownloadURL().then((url) => {
          console.log('DB URL', url)
          imageUrl(url)
        }).then(() => {
          console.log('loop in URL', word.url)
          const { url } = word
          console.log('LOOP in ELEMENTS', elements)
          const uploadInfo = { ...elements, url }
          console.log('LOOP in UPLOAD INFO', uploadInfo)
          bookDb.child(id).set(uploadInfo)
          updateBooks()
          navigation.pop()
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