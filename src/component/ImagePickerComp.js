import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
    const formData = new FormData();
    console.log('formData:::', formData);
    formData.append('file', { uri, name, type: `application/${fileType}` })
    console.log('formData', formData);

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': 'application/json'
    //   }
    // };
    // try {
    //   const res = await fetch('http://localhost:3001/upload', { method: 'post', files: formData }, config);
    //   console.log('RES', res)
    //   alert('saved')
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log("There was a problem with the server");
    //   } else {
    //     console.log('err.response.data.msg', err.response.data.msg)
    //   }
    // }
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
            <Button title='change' onPress={pickImage} />
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