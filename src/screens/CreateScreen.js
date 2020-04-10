import React from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';


const CreateScreen = ({ navigation, addData }) => {

  const onSubmit = (title, author) => {
    const elements = {
      title, author
    }
    addData(elements);
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

export default connect(null, { addData })(CreateScreen)