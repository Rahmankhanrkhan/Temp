import React from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';
import { set } from 'react-native-reanimated';
import { bookDb } from '../actions/types';
import fireaBaseConfig, { storage } from '../config/fireBaseConfig';


const CreateScreen = ({ navigation, addData, data }) => {

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
    const elements = {
      title, author,
      id: new Date().getTime()
    }
    console.log('Data ', elements.id)
    uploadImage(uri, elements.id).then(() => {
      storage.ref().child('images/' + elements.id)
        .getDownloadURL().then((url) => {
          console.log('DB URL', url)
        })
    }
    )
    bookDb.child(elements.id).set(elements)
    // const dbImage = storage.ref('images').child(elements.id)
    //   .getDownloadURL()
    updateBooks()
    navigation.pop()
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
    data: state.data
  }
}

export default connect(mapStateToProps, { addData })(CreateScreen)