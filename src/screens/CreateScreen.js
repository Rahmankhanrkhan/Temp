import React from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';
import { set } from 'react-native-reanimated';
import { bookDb } from '../actions/types';
import fireaBaseConfig, { storage } from '../config/fireBaseConfig';


const CreateScreen = ({ navigation, data, word, addData }) => {

  const uploadImage = async (uri, id) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = storage.ref().child('images/' + id)
    return ref.put(blob)
  }
  const updateBooks = () => {
    fireaBaseConfig.on('value', snap => {
      const books = snap.val().books
      addData(books)
      navigation.navigate('Index')
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
    data: state.data
  }
}
export default connect(mapStateToProps, { addData })(CreateScreen)