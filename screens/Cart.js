// Warenkorb-Bildschirmseite.

// import from react and react-native
import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// import from firebase and firebase-related file
import { db, auth } from '../firebase';
import { onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';

// import styles components, icons
import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import CheckoutButton from '../components/CheckoutButton';
import { MaterialIcons } from '@expo/vector-icons';

const Cart = () => {

    const userDoc = doc(db, 'users', auth.currentUser?.uid);
    const [shopCart, setShopCart] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    
    // Hier wird auf Firestore zugegriffen. Es werden die Produkte, die dem Warenkorb hinzugefügt wurden
    // in einem Array 'shopCart' (State-Variable) gespeichert.
    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
            setShopCart(snapshot.data().cart)
        });
        return () => unsubscribe();
    }, [])

    // Wenn sich der Inhalt von shopCart ändert, wird geprüft, ob der Warenkorb leer ist und
    // die Information wird in der State-Variable 'isEmpty' gespeichert.
    useEffect(() => {
        if (shopCart.length !== 0) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        };
    }, [shopCart])

    // Wenn das Warenkorb-Icon gedrückt wird, wird das Produkt von Firestore gelöscht. 
    // Ebenso wird gespeichert, ob der Warenkorb jetzt leer ist.
    const removeItem = (item) => {
        updateDoc(userDoc, {
            cart: arrayRemove(item)
        });
        if (shopCart.length !== 0) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        };
    }

    // Jedes Produkt im Warenkorb wird in einer Card-Komponente dargestellt.
    // Checkout-Button: Der Komponente wird die State-Variable isEmpty übergeben. Siehe CheckoutButton.js.
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
                    <View style={styles.icon}>
                        <MaterialIcons name="remove-shopping-cart" size={24} color="black" onPress={() => removeItem(item)} />
                    </View>
                </Card>
            </TouchableOpacity>
            )}}
            keyExtractor={(item) => item.id}
            />
            <CheckoutButton isEmpty={isEmpty} />
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
    icon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5
    }
})

 
export default Cart;