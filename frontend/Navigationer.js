// Navigation.js
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {useState,React} from "react";
import { View ,Text,TextInput,Button,Image,Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapComponent from './screens/Map';
import WasteCollectionHistoryScreen from './screens/Orders'
import ProfileScreen from "./screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Tab = createBottomTabNavigator();
// login
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//login method
  const handleLogin =async () => {
    try {
      const response = await fetch('http://172.20.10.2:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful', `Welcome, ${data.username}`);
        navigation.replace('Main'); // Navigate to the main screen
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };
//signup method
const gotoSignup =  () => {
  navigation.replace('SignupScreen')
};



  const main={
    businessLogo:require('C:/Users/HP/Desktop/MyApp/frontend/components/OPTIWASTE.jpg'),

  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
    <Image source={main.businessLogo} style={{width: 150,
    height: 150,
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 16,}}/>
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 10,
          borderRadius: 5,
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Sign Up Here" onPress={gotoSignup} />
    </View>
  );
};

//signup
const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//login method
 
//signup method
const handleSignup = async () => {
  try {
    const response = await fetch('http://172.20.10.2:9000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Pass username and password
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Sign Up Successful', `Welcome, ${data.username}`);
      navigation.replace('Main'); // Navigate to the main screen after successful sign-up
    } else {
      Alert.alert('Sign Up Failed', data.error || 'An error occurred during sign up.');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
    Alert.alert('Error', 'An error occurred while signing up.');
  }
};



  const main={
    businessLogo:require('C:/Users/HP/Desktop/MyApp/frontend/components/OPTIWASTE.jpg'),

  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
    <Image source={main.businessLogo} style={{width: 150,
    height: 150,
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 16,}}/>
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 10,
          borderRadius: 5,
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};



//bottom tabs
function Navigationer() {
  return (  
    
      <Tab.Navigator
        screenOptions={{
          headerShown: false,  // Hide header if showing
          tabBarPosition: "bottom", // Ensures bottom placement
        }}
      >
        {/* <Tab.Screen name="Analytics" component={Analytics}
        options={{
          tabBarIcon:()=><Ionicons name="analytics" size={24} color="black" />,
        }}
         /> */}
        <Tab.Screen name="Home" component={MapComponent}
        options={{
          tabBarIcon:()=><Feather name="home" size={24} color="black" />
        }}
         />
        <Tab.Screen name="Orders" component={WasteCollectionHistoryScreen}
        options={{
          tabBarIcon:()=><AntDesign name="profile" size={24} color="black" />
        }}
         />
        <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon:()=><AntDesign name="user" size={24} color="black" />
        }}
         />
      </Tab.Navigator>
    
  );
}
//stack navigator for everything
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       {/* Login Screen */}
       <Stack.Screen name="Login" component={LoginScreen} />
        {/* SignUp Screen */}
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
       

        {/* Main Tabs */}
        <Stack.Screen name="Main" component={Navigationer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
