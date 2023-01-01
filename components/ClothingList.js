import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Card from '../components/Card';

function ClothingList({ navigation }) {
  const [clothing, setClothing] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setClothing(data);
    }
    fetchData();
  }, []);

  return (
    /* <View>
      {clothing.map((item) => (
        <View key={item.id}>
            <Image source={{ uri: item.imageUrl}}
                style={{ width: 200, height: 200}} />
            <Text key={item.id}>{item.name}</Text>
        </View>
      ))}
    </View> */

    <FlatList
    data={clothing}
    renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
        <Card style={styles.itemCard}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
        </Card>
    </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
    />
  )}

  const styles = StyleSheet.create({
    itemCard: {
      padding: 10,
    },
  });
  
export default ClothingList;