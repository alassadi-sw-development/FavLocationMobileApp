import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'

export default function PlacesList({places}) {

  if (!places || places.length === 0){
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No Places Added yet - Start adding now</Text>
      </View>
    )
  }
  return (
    <FlatList
    style={styles.list}
  data={places}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PlaceItem place={item} />}
/>
  )
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fallbackText: {
    color: Colors.primary200,
    fontSize: 16
  },
  list : {
    margin: 24
  },
})