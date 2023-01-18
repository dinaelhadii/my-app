// import from react and react-native
import { useState, useEffect, useCallback} from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Vibration } from 'react-native';

// import styles and icons
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// import from firebase and firebase-related file
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

// import components
import BackButton from '../components/BackButton';
import AppButton from '../components/AppButton';
import { useFocusEffect } from '@react-navigation/native';

const ProductDetails = ({ route, navigation }) => {

    // Referenz zum User-Dokument
    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    const [isCart, setIsCart] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isWishlistEmpty, setIsWishlistEmpty] = useState(true);
    const [isCartEmpty, setIsCartEmpty] = useState(true);

    // Jedes Mal, wenn der Bildschirm geöffnet wird, wird die Information geladen,
    // ob das Produkt in der Wunschliste/dem Warenkorb ist und in isLiked gespeichert. Gleiches
    // wird mit isEmpty geprüft.
    useFocusEffect(
        useCallback(() => {
            const fetchIsLiked = async () => {
                await getDoc(userDoc)
                .then((snapshot) => {
                    snapshot.data().wishlist.forEach((product) => {
                        if (product.title == route.params.title) {
                            setIsLiked(true);
                            setIsWishlistEmpty(false);
                        } else {
                            setIsLiked(false);
                            setIsWishlistEmpty(true);
                        }
                    })
                })
            };
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
            };
            fetchIsLiked();
            fetchIsCart();
        }, [])
    );

    // Wenn das Herz-Icon gedrückt wird, wird toggleWishlist getriggert. Dort wird isLiked
    // geupdatet und der Vibrationsmotor ausgelöst. Wenn isLiked verändert wird, wird das
    // Produkt in likedItem gespeichert und der Wunschliste in Firestore hinzugefügt oder von
    // dieser gelöscht, abhängig von isLiked.
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
            updateDoc(userDoc, {
                wishlist: arrayRemove(likedItem)
            });
        }
    }, [isLiked])

    // Analog zu oben.
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
            updateDoc(userDoc, {
                cart: arrayUnion(cartedItem)
            });
        } else if (isCart == false && isCartEmpty == false) {
            updateDoc(userDoc, {
                cart: arrayRemove(cartedItem)
            });
        }
    }, [isCart])

    // Toggeln des Like- oder Warenkorb-Buttons löst Vibrationsmotor aus.
    const toggleWishlist = () => {
        Vibration.vibrate([400]);
        setIsLiked(!isLiked);
    }

    const toggleCart = () => {
        Vibration.vibrate([400]);
        setIsCart(!isCart);
    }
    
    // Navigiert zu den Bewertungen, wenn der entsprechende Knopf gedrückt wird.
    const reviewHandler = () => {
        let id = route.params.id;
        navigation.navigate('Reviews', id);
    }

    return (
        <View style={globalStyles.container}>
            <BackButton navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={globalStyles.titleText}>{route.params.title}</Text>
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

                <View style={{marginTop: 10, flexDirection: 'row', alignSelf: 'center'}}>
                    <Ionicons 
                        name={isLiked ? "heart" : 'heart-outline'} size={28} 
                        color="black" onPress={() => toggleWishlist()} />
                    <MaterialIcons 
                        name={isCart ? "remove-shopping-cart" : "add-shopping-cart"} size={28} 
                        color="black"
                        onPress={() => toggleCart()} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Beschreibung</Text>
                    <Text style={styles.description}>{route.params.description}</Text>
                </View>

                <AppButton title={'Bewertungen'} pressHandler={() => reviewHandler()} />
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