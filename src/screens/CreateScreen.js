import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Keyboard } from 'react-native'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { addData } from '../actions/actions';
// import { addData } from '../actions/actions'
import { connect } from 'react-redux';


const CreateScreen = ({ navigation, addData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const onSubmit = () => {
    addData(title, author);
    navigation.pop()
  }

  return (

    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
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
          title='add'
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

export default connect(null, { addData })(CreateScreen)