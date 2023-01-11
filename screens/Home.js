import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles, images } from '../styles/global';
import Card from '../components/Card';

import { products, colRef } from '../firebase';
import { onSnapshot, getDocs } from 'firebase/firestore';

const Home = ({ navigation, route }) => {

  const [productData, setProductData] = useState([]);
  const userName = route.params
  console.log(userName)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(colRef)
      setProductData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

    return (
      <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>Willkommen!</Text>
          <FlatList
          data={productData}
          renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
                <Card>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Image source={{uri: item.image}} style={{width: 200, height: 200}} />
                    <Text>{item.price}</Text>
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