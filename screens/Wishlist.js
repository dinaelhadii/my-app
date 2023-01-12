// import from react and react-native
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Vibration } from 'react-native';

// import from firebase and firebase-related files
import { db, auth } from '../firebase';
import { onSnapshot, getDoc, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore';

// import styles and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';

// import icons
import { MaterialIcons } from '@expo/vector-icons';

const Wishlist = ({ route }) => {

    const [wishlist, setWishlist] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isCart, setIsCart] = useState(false);
    const [product, setProduct] = useState();

    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    let cartItem = {};

    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
            setWishlist(snapshot.data().wishlist)
        });
        return () => unsubscribe();
    }, [])

/*     const toggleCart = (item) => {
        Vibration.vibrate([400]);
        setIsCart(!item.isCart);
        cartItem = {
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            id: item.id
        }
        setProduct(cartItem);
    } */

    return ( 
        <View style={globalStyles.container}>
            <FlatList 
            data={wishlist}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity style={styles.card}>
                <Card>
                    <Text style={globalStyles.productTitle}>{item.title}</Text>
                    <Text>{item.price}</Text>
                    <View style={styles.sCart}>
                        <MaterialIcons name={item.isCart ? "remove-shopping-cart" : "add-shopping-cart"} size={24} 
                            color="black"
                            onPress={() => toggleCart(item)} />
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
        justifyContent: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5
    }
})

export default Wishlist;