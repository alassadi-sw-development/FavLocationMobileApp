import { Alert, StyleSheet, View, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function LocationPicker({onPickLocation, getAddress}) {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [locationImageUrl, setLocationImageUrl] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.pickedLocation) {
      const { latitude, longitude } = route.params.pickedLocation;
      const staticMapUrl = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=14&l=map&size=600,300&pt=${longitude},${latitude},pm2rdm`;
      setLocationImageUrl(staticMapUrl);
    }
  }, [route.params]);

  async function verifyPermissions() {
    if (!locationPermissionInformation) {
      return false;
    }

    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this feature.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    // Generate the OpenStreetMap static map URL
    const staticMapUrl = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=14&l=map&size=600,300&pt=${longitude},${latitude},pm2rdm`;
    setLocationImageUrl(staticMapUrl);
    onPickLocation({lat: latitude, lng: longitude})
    getAddress(latitude, longitude)
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location Picked Yet!</Text>;
  if (locationImageUrl) {
    locationPreview = (
      <Image source={{ uri: locationImageUrl }} style={styles.mapImage} resizeMode="cover" />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 300,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden"
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
