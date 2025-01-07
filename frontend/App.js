import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView,Text, View,SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './Navigationer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    
    <Navigation/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
