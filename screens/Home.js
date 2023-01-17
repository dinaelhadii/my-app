// Das Home-Menü, welche die verfügbaren Produkte anzeigt, welcher in der Firestore-Datenbank hinterlegt sind.

// import from react and react-native
import { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// import from firebase and firebase-related file
import { products, colRef, auth, db } from '../firebase';
import { onSnapshot, collection, getDocs, doc, getDoc } from 'firebase/firestore';

// import styles and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';

const Home = ({ navigation }) => {

  const [productData, setProductData] = useState([]);
  const [name, setName] = useState('');

  // Beim ersten Rendern der Bildschirmseite werden die Produkte und der Nutzername vorher geladen.
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

  // Jedes Produkt wird in einer Card-Komponente dargestellt. Beim Anklicken navigiert die App
  // zu einer neuen Seite, welche die Produktdetails enthält.
    return (
      <View style={globalStyles.container}>
          <Text style={[globalStyles.titleText, {fontSize: 24}]}>Willkommen {name}!</Text>
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
                        width: 200, height: 150, 
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