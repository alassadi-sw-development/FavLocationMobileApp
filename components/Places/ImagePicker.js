import { Button, StyleSheet, Text, View, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCameraAsync, requestCameraPermissionsAsync } from 'expo-image-picker'
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

export default function ImagePicker({onTakeImage}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [pickedImage, setPickedImage] = useState();

  useEffect(() => {
    async function requestPermission() {
      const { status } = await requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    }
    requestPermission();
  }, []);

  async function TakeImageHandler() {
    if (!cameraPermission) {
      Alert.alert('Permission required', 'You need to grant camera access to use this feature.');
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri)
    onTakeImage(image.assets[0].uri);
    
  }

  let imagePreview = <Text>No Image Taken Yet!</Text>
  if(pickedImage){
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} resizeMode="cover" />
  }


  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton icon="camera" onPress={TakeImageHandler}>Take Image</OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 300,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow:"hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
});
