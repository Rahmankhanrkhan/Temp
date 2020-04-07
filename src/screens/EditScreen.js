import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { editData } from '../actions/actions'
import FormField from '../component/FormField'

const EditScreen = ({ navigation, data, editData }) => {

  const id = navigation.getParam('id')
  
  const onSubmit = (title, author) => {
    editData(title, author, id)
    navigation.pop()
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
