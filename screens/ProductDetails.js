// import from react and react-native
import { useState, useEffect } from 'react';
import { 
    View, ScrollView, SafeAreaView, StyleSheet, Text, Image, 
    Button, FlatList, Modal, TouchableOpacity, Keyboard, Vibration, Platform, SectionList
} from 'react-native';

// import icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// import from firebase and firebase-related files
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';

// import styles and components
import { globalStyles } from '../styles/global';
import BackButton from '../components/BackButton';

const ProductDetails = ({ route, navigation }) => {

    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    const [isLiked, setIsLiked] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [isWishlistEmpty, setIsWishlistEmpty] = useState(true);
    const [isCartEmpty, setIsCartEmpty] = useState(true);


    useEffect(() => {
        const fetchIsLiked = async () => {
            await getDoc(userDoc)
            .then((snapshot) => {
                snapshot.data().wishlist.forEach((product) => {
                    if (product.title == route.params.title) {
                        setIsLiked(true);
                        setIsWishlistEmpty(false);
                    }
                })
            })
        }
        const fetchIsCart = async () => {
            await getDoc(userDoc)
            .then((snapshot) => {
                snapshot.data().cart.forEach((product) => {
                    if (product.title == route.params.title) {
                        setIsCart(true);
                        setIsCartEmpty(false);
                    }
                })
            })
        }
        fetchIsLiked();
        fetchIsCart();
    }, [])

    useEffect(() => {
        let likedItem = {};
        likedItem = {
            title: route.params.title,
            price: route.params.price,
            description: route.params.description,
            image: route.params.image,
            id: route.params.id,
            isCart: false,
        }
        if (isLiked == true) {
            updateDoc(userDoc, {
                wishlist: arrayUnion(likedItem)
            });
        } else if (isLiked == false && isWishlistEmpty == false) {
            console.log('deleting item from wishlist');
            updateDoc(userDoc, {
                wishlist: arrayRemove(likedItem)
            });
        }
    }, [isLiked])

    useEffect(() => {
        let cartedItem = {};
        cartedItem = {
            title: route.params.title,
            price: route.params.price,
            description: route.params.description,
            image: route.params.image,
            id: route.params.id,
        }
        if (isCart == true) {
            console.log('adding to cart')
            updateDoc(userDoc, {
                cart: arrayUnion(cartedItem)
            });
        } else if (isCart == false && isCartEmpty == false) {
            console.log('deleting item from cart');
            updateDoc(userDoc, {
                cart: arrayRemove(cartedItem)
            });
        }
    }, [isCart])

    const addLikedItem = () => {
        console.log('toggling like button')
        Vibration.vibrate([400]);
        setIsLiked(!isLiked);
    }

    const toggleCart = () => {
        Vibration.vibrate([400]);
        setIsCart(!isCart);
    }
    
    const reviewHandler = () => {
        let id = route.params.id;
        navigation.navigate('Reviews', id);
    }

    return (
        <View style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BackButton navigation={navigation} />
                <View>
                    <Text style={globalStyles.titleText}>{route.params.title}</Text>
                    <Ionicons 
                        name={isLiked ? "heart" : 'heart-outline'} size={24} 
                        color="black" onPress={() => addLikedItem()} />
                    <MaterialIcons 
                        name={isCart ? "remove-shopping-cart" : "add-shopping-cart"} size={24} 
                        color="black"
                        onPress={() => toggleCart()} />
                    <Image 
                        source={{uri: route.params.image}}
                        style={{
                            width: 200, height: 200, 
                            resizeMode: 'contain', alignSelf: 'center',
                            margin: 10,
                            }}
                    />
                    <Text style={styles.price}>{route.params.price}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Beschreibung</Text>
                    <Text style={styles.description}>{route.params.description}</Text>
                </View>

                <TouchableOpacity onPress={() => reviewHandler()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Bewertungen</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
      );
    }

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    price: {
        textAlign: 'left',
        marginTop: 10,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#2997FF',
        width: 200,
        borderRadius: 10,
        padding: 10,
        margin: 20,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'nunito-bold',
        alignSelf: 'center',
        color: '#fff'
    },
    section: {
        paddingTop: 18,
    },
    sectionTitle: {
        fontSize: 23,
        fontFamily: 'nunito-bold',
    },
    description: {
        fontFamily: 'nunito-regular',
        marginTop: 2,
    },
})
 
export default ProductDetails;