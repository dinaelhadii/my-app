// Hier werden die Produkte, welche der Nutzer zum Warenkorb hinzugefügt hat
// in einer FlatList angezeigt.

// import from react and react-native
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';

// import from firebase and firebase-related files
import { db, auth } from '../firebase';
import { onSnapshot, updateDoc, arrayRemove, doc } from 'firebase/firestore';

// import styles, icons and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

const Wishlist = () => {

    const userDoc = doc(db, 'users', auth.currentUser?.uid);
    const [wishlist, setWishlist] = useState([]);

    // Bei jeder Änderung der Wunschliste durch den Nutzer werden die Daten in Firestore aktualisiert.
    useEffect(() => {
        let unsubscribe = onSnapshot(userDoc, (snapshot) => {
            setWishlist(snapshot.data().wishlist)
        });
        return () => unsubscribe();
    }, [])

    // Siehe Cart.js.
    const removeItem = (item) => {
        updateDoc(userDoc, {
            wishlist: arrayRemove(item)
        });
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
                    <View style={styles.icon}>
                        <Ionicons name={"heart-dislike"} size={24} color="black" onPress={() => removeItem(item)} />
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
    icon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5
    }
})

export default Wishlist;