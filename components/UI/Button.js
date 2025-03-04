import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function Button({onPress, children}) {
  return (
    <Pressable onPress={onPress} style={({pressed})=>[styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation : 4,
    borderRadius: 4,
    overflow : "hidden"
  },
  pressed:{
    opacity : 0.7
  },
  text: {
    textAlign:"center",
    fontSize : 24,
    color: Colors.primary50
  },
})