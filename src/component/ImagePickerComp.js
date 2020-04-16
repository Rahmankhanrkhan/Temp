import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { bookDb } from '../actions/types';
import { storage } from '../config/fireBaseConfig';

const ImagePickerComp = () => {
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

  const submit = async (res) => {
    console.log('submitted', res)
    const { uri } = res
    console.log('uri::', uri)
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const name = new Date().getTime() + '.' + fileType
    console.log('name', name)


  }


  const onImageSelect = () => {
    pickImage
  }
  const imageName = new Date.getTime()
  const uploadImage = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = storage.ref().child('images/' + imageName)
    return ref.put(blob)
  }


  return (
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
            <Button title='change' onPress={onImageSelect} />
            {/* <Button title='save' onPress={() => uploadImage(state.image.uri)} /> */}
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 500,
    height: 100,
    resizeMode: "contain"
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 10
  }
});

export default ImagePickerComp;