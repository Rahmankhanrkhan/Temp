import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { editData } from '../actions/actions'
import FormField from '../component/FormField'
import { bookDb } from '../actions/types'

const EditScreen = ({ navigation, data, editData }) => {
  const id = navigation.getParam('id')

  const onSubmit = (title, author) => {
  const elements = {
   title, author,id
}
    // editData(elements)
    bookDb.child(elements.id).set(elements)
    navigation.navigate('Detail')
  }

  return (
    <View>
      <FormField
        buttonText='Save'
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

export default connect(mapStateToProps, { editData })(EditScreen)
