import React from 'react';
import { StyleSheet, Text, View, FlatList,SafeAreaView } from 'react-native';

const WasteCollectionHistoryScreen = () => {
  // Sample data for waste collection orders
  const wasteCollectionOrders = [
    { id: '1', location: 'Tema Station', date: '2024-12-01', status: 'Completed' },
    { id: '2', location: 'GARCC, Accra', date: '2024-11-28', status: 'Pending' },
    { id: '3', location: 'Blue Lagoon Road 84', date: '2024-11-25', status: 'Completed' },
    { id: '4', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '5', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '6', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '7', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '8', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '9', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '10', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
    { id: '11', location: 'Osu Market', date: '2024-11-20', status: 'Cancelled' },
  ];

  // Render item for the FlatList
  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderLocation}>{item.location}</Text>
      <Text style={styles.orderDetails}>Date: {item.date}</Text>
      <Text style={[styles.orderStatus, getStatusStyle(item.status)]}>
        Status: {item.status}
      </Text>
    </View>
  );

  // Style for order status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { color: 'green' };
      case 'Pending':
        return { color: 'orange' };
      case 'Cancelled':
        return { color: 'red' };
      default:
        return { color: 'black' };
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Waste Collection History</Text>
      <FlatList
        data={wasteCollectionOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WasteCollectionHistoryScreen;
