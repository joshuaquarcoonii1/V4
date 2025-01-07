import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert,ImageBackground,Switch } from 'react-native';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper



const Content = () => {
  const [clickCount, setClickCount] = useState(0);
  const [fact, setFact] = useState('');
  // switch stuff
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Function to handle button click
  const handleClick = () => {
    setClickCount(clickCount + 1);
    fetchRandomFact();
  };
  const Spacer = ({ height, width }) => <View style={{ height, width }} />;

  // Fetch random fact from an API
  const fetchRandomFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text); // Update the fact
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch a random fact');
    }
  };

  return (
    
    <View style={styles.container}>
   <View style={styles.background} /> 
   

   <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxzb2Z0JTIwZ3JhZGllbnR8ZW58MHx8fHwxNjY5NzY4Nzgy&ixlib=rb-1.2.1&q=80&w=1080' }} // Replace with your image URL or require('./path/to/image.jpg')
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

      </ImageBackground>
      
      {/* <Background/> */}

      {/* CARD */}
      
      <Card style={styles.card}>
        <Card.Content>
        <Text style={styles.text} >Button Clicked: {clickCount} times</Text>
      <Button style={styles.button} title="Click Me!" onPress={handleClick} />
      {fact ? (
        <Text style={styles.text}>Random Fact: {fact}</Text>
      ) : (
        <Text style={styles.text}>Click the button to get a random fact!</Text>
      )}
        </Card.Content>
      </Card>
      <Spacer height={30} />

      <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',                  
}
,
card: {
  width: 300, // Set a width for your card
  elevation: 5, // Adds shadow effect
  borderRadius: 19, // Rounded corners
  backgroundColor: 'rgba(112, 218, 244, 0.8)'
  
},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.0001)', // Adjust the last value (0.5) to control opacity (0 to 1)
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,  // Ensures it covers the whole screen
    resizeMode: 'cover',
  },
  background: {
    ...StyleSheet.absoluteFillObject,  // Stretches the background to cover the whole container
    backgroundColor: '#ADD8E6',         // Replace with your preferred color or background image
    zIndex: -1,                         // Ensures it stays behind other content
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: 'black',
  },
});

export default Content;

