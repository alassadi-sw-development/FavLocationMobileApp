import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../UI/Button'
import { Place } from '../../models/Place'

export default function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState("")
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [address, setAddress] = useState();

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText)
  }

  async function getAddress(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch address!');
      }
      const data = await response.json();
      const address = data.display_name
      setAddress(address)
      
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }

  
  function takeImageHandler(imageUri){
    setSelectedImage(imageUri)
  }

  function pickLocationHandler(location){
    setPickedLocation(location)
  }

  function savePlaceHandler(){
    //console.log(selectedImage, pickedLocation, address);
    const placeData = new Place(enteredTitle, selectedImage, address, pickedLocation )
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Ttile</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} getAddress={getAddress} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex:1,
    padding: 24,
  },
  label : {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500
    },
  input: {
    marginVertical:  8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBlockColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})