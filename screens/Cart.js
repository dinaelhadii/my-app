import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { colRef, db, auth } from '../firebase';
import { onSnapshot, userDoc, doc } from 'firebase/firestore';

import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import CheckoutButton from '../components/CheckoutButton';

const Cart = () => {

    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    const [shopCart, setShopCart] = useState([]);

    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
            setShopCart(snapshot.data().cart)
        });
        return () => unsubscribe();
    }, [])

    return ( 
        <View style={globalStyles.container}>
            <FlatList 
            style={styles.list}
            data={shopCart}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity>
                <Card>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Image 
                    source={{uri: item.image}}
                    style={{
                        width: 200, height: 120, 
                        resizeMode: 'contain', alignSelf: 'center',
                        margin: 10,
                        }}
                    />
                    <Text>{item.price}</Text>
                </Card>
            </TouchableOpacity>
            )}}
            keyExtractor={(item) => item.id}
            />
            <CheckoutButton />
        </View>
     );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    list: {
        flex: 1
    },
})

 
export default Cart;