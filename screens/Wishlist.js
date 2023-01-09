// import from react and react-native
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Vibration } from 'react-native';

// import from firebase and firebase-related files
import { products, colRef, db } from '../firebase';
import { onSnapshot, getDoc, updateDoc, doc } from 'firebase/firestore';

// import styles and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';

// import icons
import { MaterialIcons } from '@expo/vector-icons';

const Wishlist = ({ route }) => {

    const [wishlist, setWishlist] = useState([]);

    const [isCart, setIsCart] = useState(false);

    useEffect(() => {
        let unsubscribe = onSnapshot(colRef, (snapshot) => {
            let wishlist = [];
            snapshot.docs.forEach((doc) => {
                if (doc.data().isLiked === true) {
                    wishlist.push({ ...doc.data(), id: doc.id });
                }
            });
            setWishlist(wishlist);
          });
          return () => unsubscribe();
    }, []);

    const addToCart = (id) => {
        Vibration.vibrate([400]);
        setIsCart(!isCart);
        updateDoc(doc(db, 'products', id), {
            "isCart": !isCart
        });
    }

    return ( 
        <View style={globalStyles.container}>
            <FlatList 
            data={wishlist}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity>
                <Card style={globalStyles.itemCard}>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Text>{item.price}</Text>
                    <View style={styles.sCart}>
                        <MaterialIcons name={isCart ? "remove-shopping-cart" : "add-shopping-cart"} size={24} 
                            color="black"
                            onPress={() => addToCart(item.id)} />
                    </View>
                </Card>
            </TouchableOpacity>
            )}}
            keyExtractor={(item) => item.id}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    sCart: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export default Wishlist;