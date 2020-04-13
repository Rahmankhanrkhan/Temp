import React from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';
import { set } from 'react-native-reanimated';
import { bookDb } from '../actions/types';
import fireaBaseConfig from '../config/fireBaseConfig';

// class CreateScreen extends Component {
//   constructor(props) {
//     super(props)
//     this.bookDb = fireaBaseConfig.child('books')
//   }

const CreateScreen = ({ navigation, addData, data }) => {

  const updateBooks = () => {
    fireaBaseConfig.on('value', snap => {
      console.log('dbData', snap.val().books)
      const books = snap.val().books
      addData(books)
    })
  }

  const onSubmit = (title, author) => {
    const elements = {
      title, author,
      id: new Date().getTime()
    }
    console.log('Data ', elements.id)
    bookDb.child(elements.id).set(elements)
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