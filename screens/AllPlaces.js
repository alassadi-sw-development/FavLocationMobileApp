import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/Places/PlacesList'
import { useIsFocused } from '@react-navigation/native'

export default function AllPlaces({route}) {
  const [loadedPlaces, setLoadedPlaces]=useState([])
const issFocused = useIsFocused();
  useEffect(()=>{
    if(issFocused && route.params){
      setLoadedPlaces(current => [...current, route.params.place ])
    }
  },[issFocused, route])
  return (
    <PlacesList places={loadedPlaces} />
  )
}

const styles = StyleSheet.create({})