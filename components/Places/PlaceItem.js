import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable 
      onPress={onSelect} 
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    padding: 12,
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    elevation: 3, // Android shadow
    shadowColor: 'black', // iOS shadow
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex : 1,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700,
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: Colors.gray700,
  },
})
