import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles, images } from '../styles/global';
import Card from '../components/Card';

import { products, colRef, auth, db } from '../firebase';
import { onSnapshot, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const Home = ({ navigation }) => {

  const [productData, setProductData] = useState([]);

  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(colRef)
      setProductData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();

    const userDoc = doc(db, 'users', auth.currentUser?.uid);
    getDoc(userDoc)
      .then((snapshot) => {
        setName(snapshot.data().name);
      })
  }, []);

    return (
      <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>Willkommen {name}!</Text>
          <FlatList
          data={productData}
          renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
                <Card>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Image 
                      source={{uri: item.image}} 
                      style={{
                        width: 200, height: 120, 
                        resizeMode: 'contain', alignSelf: 'center',
                        margin: 10,
                        }} />
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