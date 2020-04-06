import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback, TextInput } from 'react-native-gesture-handler'
import { editData } from '../actions/actions'

const EditScreen = ({ navigation, data, editData }) => {
  console.log('getparam', navigation.getParam('id'))
  const id = navigation.getParam('id')
  const detail = data.find(data => data.id === id)

  const [title, setTitle] = useState(detail.title);
  const [author, setAuthor] = useState(detail.author);

  const onSubmit = () => {
    editData(title, author, id)
    navigation.pop()
  }

  return (
    <View>
      

      <TouchableWithoutFeedback  >
        <TextInput
          placeholder='enter'
          style={styles.input}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          placeholder='enter'
          style={styles.input}
          onChangeText={setAuthor}
        />
        <Button
          title='save'
          onPress={onSubmit}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 10
  }
})


const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, { editData })(EditScreen)
