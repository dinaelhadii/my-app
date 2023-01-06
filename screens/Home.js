import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles } from '../styles/global';
import Card from '../components/Card';

import { products } from '../firebase';

const Home = ({ navigation }) => {

/*   useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products?limit=100&skip=10');
      const data = await response.json();
      data.products = data.products.filter(
        product => product.category === "womens-dresses" || 
        product.category === "womens-shoes" || product.category === "mens-shirts" ||
        product.category === "mens-shoes" ||  product.category === "womens-bags");
      setClothing(data);
    }
    fetchData();
  }, []); */

  console.log('home: ', products)

    return (
      <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>Willkommen!</Text>
          <FlatList
          data={products}
          renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
                <Card style={globalStyles.itemCard}>
                    <Text>{item.title}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.id}</Text>
                </Card>
              </TouchableOpacity>
            </View>
            )}}
          keyExtractor={(item) => item.id}
          />
      </View>
    );
}

export default Home;