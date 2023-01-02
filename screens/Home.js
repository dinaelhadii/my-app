import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import ClothingList from '../components/ClothingList';

const Home = ({ navigation }) => {

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
        <FlatList
        data={clothing}
        renderItem={({ item }) => {

        return (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
              <Card style={styles.itemCard}>
                  <Text>{item.title}</Text>
                  <Text>{item.price}</Text>
                  <View>
                    <Image source={ (item.image) } />
                  </View>
              </Card>
          </TouchableOpacity>
          )}}
        keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    itemCard: {
      padding: 10,
    },
  });

export default Home;