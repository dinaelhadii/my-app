// import from react and react-native
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StyleSheet, Vibration } from 'react-native';

// import from firebase and firebase-related files
import { db, auth } from '../firebase';
import { onSnapshot, updateDoc, doc } from 'firebase/firestore';

// import styles, icons and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

const Wishlist = ({ route }) => {

    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
            setWishlist(snapshot.data().wishlist)
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
          setCart(snapshot.data().cart);
        });
        return () => unsubscribe();
      }, []);

/*     useEffect(() => {
        const fetchIsCart = async () => {
            await getDoc(userDoc)
            .then((snapshot) => {
                snapshot.data().cart.forEach((product) => {
                    if (product.title == route.params.title) {
                        setIsCart(true);
                        setIsEmpty(false);
                    }
                })
            })
        }
        fetchIsCart();
    }, []) */

    const toggleCart = (item) => {
        Vibration.vibrate([400]);
        const isInCart = cart.find(product => product.id === item.id);
        if (isInCart) {
          setCart(currentCart => currentCart.filter(product => product.id !== item.id));
          updateDoc(userDoc, { cart: cart.filter(product => product.id !== item.id)});
        } else {
          setCart([...cart, item]);
          updateDoc(userDoc, { cart: [...cart, item]});
        }
    }
        
    return ( 
        <View style={globalStyles.container}>
            <FlatList 
            data={wishlist}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity style={styles.card}>
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