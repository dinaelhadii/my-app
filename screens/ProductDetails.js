// import from react and react-native
import { useState, useEffect } from 'react';
import { 
    View, ScrollView, StyleSheet, Text, Image, 
    Button, FlatList, Modal, TouchableWithoutFeedback, Keyboard, Vibration, Platform
} from 'react-native';

// import icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// import from firebase and firebase-related files
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, colRef, auth } from '../firebase';

// import styles and components
import { globalStyles, images } from '../styles/global';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../screens/ReviewForm';

const ProductDetails = ({ route, navigation }) => {

    const productID = route.params.id;
    const reviewRef = collection(db, 'products', productID, 'reviews');
    const userDoc = doc(db, 'users', auth.currentUser?.uid);

    const [isLiked, setIsLiked] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [isWishlistEmpty, setIsWishlistEmpty] = useState(true);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

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
            console.log('deleting item');
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

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(reviewRef, (snapshot) => {
            let reviews = [];
            snapshot.docs.forEach((doc) => {
                reviews.push({...doc.data().review, id: doc.id})
            });
            setReviews(reviews);
        });

        return () => unsubscribe();
      },[]);

    const addLikedItem = () => {
        console.log('toggling like button')
        Vibration.vibrate([400]);
        setIsLiked(!isLiked);
    }

    const toggleCart = () => {
        Vibration.vibrate([400]);
        setIsCart(!isCart)
    }

    const pressHandler = () => {
        navigation.navigate('Home')
    }

    const addReview = (review) => {
        addDoc(reviewRef, {
            review: {
                'title': review.title,
                'body': review.body,
                'rating': review.rating
            }
        })
        setModalOpen(false);
    }

    function dismissKeyboard() {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    }

    return (
        <View style={[globalStyles.container, {flex: 1}]}>

            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback
                onPress={() => dismissKeyboard()}>
                    <View style={globalStyles.container}>
                        <MaterialIcons 
                        name='close'
                        size={24}
                        style={{...styles.modalToggle, ...styles.modalClose}}
                        onPress={() => setModalOpen(false)}
                        />
                        <ReviewForm 
                            addReview={addReview} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={{flex: 2}}>
                <View style={styles.backButton}>
                    <Ionicons name="chevron-back" size={22} 
                    color="#007AFF" 
                    onPress={() => pressHandler()}/>
                    <Button 
                        title={'Back'}    
                        onPress={() => pressHandler()}
                    />
                </View>

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
            </View>

            <View style={{flex: 1, marginTop: 10}}>
                <Text style={styles.sectionTitle}>Bewertungen</Text>
                <FlatList 
                    data={reviews}
                    renderItem={({ item }) => {
                        return (
                        <View>
                            <ReviewCard style={globalStyles.itemCard}>
                                <Text>{item.title}</Text>
                                <Text>{item.body}</Text>
                                <Image source={(images.ratings[item.rating])} />
                            </ReviewCard>
                        </View>
                        )}}
                        keyExtractor={(item) => item.id}
                />
                <Button title={'Bewertung hinzufügen...'} onPress={() => setModalOpen(true)} />
            </View>
          
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 10,
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
    modalToggle: {
        marginBottom: 10,
        borderWidth: 4,
        borderColor: '#3395ff',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 50,
        marginBottom: 10,
    },
})
 
export default ProductDetails;