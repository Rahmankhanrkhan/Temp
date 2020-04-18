import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Spacer from './Space'
import * as ImagePicker from 'expo-image-picker';


const FormField = ({ buttonText, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [state, setState] = useState({ image: null });

  const pickImage = async () => {
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1, 
    });

    console.log(imageResult);
    if (!imageResult.cancelled) {
      setState({ image: imageResult });
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <Spacer>
          <Text style={styles.text} >Enter Title </Text>
          <TextInput
            autoFocus={true}
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
        <View style={styles.container} >
          <View>
            {
              state.image ? (
                <View style={{ marginBottom: 10 }}  >
                  <Image
                    source={{ uri: state.image.uri }}
                    style={styles.imageStyle}
                  />
                </View>
              ) : (
                  <Button
                    title="Pick an image from gallery"
                    onPress={pickImage}
                  />
                )
            }
          </View>
          {state.image ?
            (
              <View style={styles.button} >
                <Button title='change' onPress={pickImage} />
              </View>
            ) : null
          }
        </View>

        <View style={styles.button} >
          {title && author ? <Button
            title={buttonText}
            onPress={() => onSubmit(title, author, state.image.uri)}
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
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 500,
    height: 100,
    resizeMode: "contain"
  },
})

export default FormField
