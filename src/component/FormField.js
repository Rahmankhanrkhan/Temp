import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Spacer from './Space'
import ImagePickerComp from './ImagePickerComp'

const FormField = ({ buttonText, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <Spacer>
          <Text style={styles.text} >Enter Title </Text>
          <TextInput
            placeholder='Title'
            style={styles.input}
            onChangeText={text => setTitle(text)}
          />
        </Spacer>
        <Spacer>
          <Text style={styles.text} >Enter Author </Text>

          <TextInput
            placeholder='Author'
            style={styles.input}
            onChangeText={setAuthor}
          />
        </Spacer>
        {/* <ImagePickerComp/> */}
        <View style={styles.button} >
          {title && author ? <Button
            title={buttonText}
            onPress={() => onSubmit(title, author)}
          /> : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 100
  },
  text: {
    marginHorizontal: 10
  }
})

export default FormField
