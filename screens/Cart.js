import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { colRef } from '../firebase';
import { onSnapshot } from 'firebase/firestore';

import { globalStyles } from '../styles/global';
import Card from '../components/Card';

const Cart = () => {

    const [shopCart, setShopCart] = useState([]);

    useEffect(() => {
        let unsubscribe = onSnapshot(colRef, (snapshot) => {
            let shopCart = [];
            snapshot.docs.forEach((doc) => {
                if (doc.data().isCart === true) {
                    shopCart.push({ ...doc.data(), id: doc.id });
                }
            });
            setShopCart(shopCart);
          });
          return () => unsubscribe();
    }, []);

    return ( 
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Warenkorbinhalt</Text>
            <FlatList 
            data={shopCart}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity>
                <Card style={globalStyles.itemCard}>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Text>{item.price}</Text>
                </Card>
            </TouchableOpacity>
            )}}
            keyExtractor={(item) => item.id}
        />
        </View>
     );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    }
    
})

 
export default Cart;