import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';


const MapComponent = () => {
  const [region, setRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState('<50 kg');
  const bottomSheetRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to use the map.');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerLocation({ latitude, longitude });
    setLocationName(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
  };

  const handleRequestPickup = () => {
    if (!markerLocation || !wasteType) {
      Alert.alert('Error', 'Please select a location and waste type.');
      return;
    }
    setModalVisible(true);
  };



  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={handleMapPress}
        >
          {markerLocation && (
            <Marker
              coordinate={markerLocation}
              draggable
              onDragEnd={(e) => handleMapPress(e)}
            />
          )}
        </MapView>
      )}
<GestureHandlerRootView>
      <BottomSheet ref={bottomSheetRef} snapPoints={['50%','75%']}enablePanDownToClose={false}>
      <BottomSheetView>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Select Pickup Location</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Where should we collect the waste?"
          />

          <Text style={styles.label}>Waste Type</Text>

          <View style={styles.wasteTypeContainer}>
  <TouchableOpacity
    style={[
      styles.wasteTypeButton,
      wasteType === 'Household' && styles.wasteTypeButtonSelected,
    ]}
    onPress={() => setWasteType('Household')}
  >
    <Text
      style={
        wasteType === 'Household'
          ? styles.wasteTypeTextSelected
          : styles.wasteTypeText
      }
    >
      Household
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.wasteTypeButton,
      wasteType === 'Recyclables' && styles.wasteTypeButtonSelected,
    ]}
    onPress={() => setWasteType('Recyclables')}
  >
    <Text
      style={
        wasteType === 'Recyclables'
          ? styles.wasteTypeTextSelected
          : styles.wasteTypeText
      }
    >
      Recyclables
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.wasteTypeButton,
      wasteType === 'Industrial' && styles.wasteTypeButtonSelected,
    ]}
    onPress={() => setWasteType('Industrial')}
  >
    <Text
      style={
        wasteType === 'Industrial'
          ? styles.wasteTypeTextSelected
          : styles.wasteTypeText
      }
    >
      Industrial
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.wasteTypeButton,
      wasteType === 'Construction' && styles.wasteTypeButtonSelected,
    ]}
    onPress={() => setWasteType('Construction')}
  >
    <Text
      style={
        wasteType === 'Construction'
          ? styles.wasteTypeTextSelected
          : styles.wasteTypeText
      }
    >
      Construction
    </Text>
  </TouchableOpacity>
</View>


          <TouchableOpacity style={styles.requestButton} onPress={handleRequestPickup}>
            <Text style={styles.requestButtonText}>Request Collection</Text>
          </TouchableOpacity>
        </View>
        </BottomSheetView>
      </BottomSheet>
</GestureHandlerRootView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Payment and Waste Details</Text>

          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentContainer}>
            {['Online', 'In Person'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentButton,
                  paymentMethod === method && styles.paymentButtonSelected,
                ]}
                onPress={() => setPaymentMethod(method)}
              >
                <Text
                  style={
                    paymentMethod === method
                      ? styles.paymentTextSelected
                      : styles.paymentText
                  }
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Waste Quantity</Text>
          
         

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              setModalVisible(false);
              Alert.alert('Success', 'Your request has been submitted.');
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  detailsContainer: { padding: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  wasteTypeContainer: { flexDirection: 'row', justifyContent: 'space-around', // Ensures even spacing
    marginVertical: 15, // Adds vertical space
    paddingHorizontal: 15, },
  wasteTypeButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal:7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  wasteTypeButtonSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  wasteTypeText: { color: 'black' },
  wasteTypeTextSelected: { color: 'white' },
  requestButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: { color: 'white', fontSize: 16 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  paymentContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  paymentButton: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  paymentText: { color: 'black' },
  paymentTextSelected: { color: 'white' },
  confirmButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: { color: 'white', fontSize: 16 },
});

export default MapComponent;
