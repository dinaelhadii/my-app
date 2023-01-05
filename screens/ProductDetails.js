import { 
    View, StyleSheet, Text, Image, 
    Button, FlatList, Modal, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles, images } from '../styles/global';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../screens/ReviewForm';

const ProductDetails = ({ route, navigation }) => {

    const productID = route.params.id;
    const reviewRef = collection(db, 'products', productID, 'testreview');
    //const reviewRef = 'products/' + productID + '/testreview';
    //const reviewDoc = doc(db, reviewRef)

    const [isLiked, setIsLiked] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const addToWishlist = (likedItem) => {
        setIsLiked(!isLiked);
        setItem(likedItem);
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
        console.log('added review');
        setModalOpen(false);
    }

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        collection(db, 'products', productID, 'testreview');
        const unsubscribe = onSnapshot(reviewRef, (snapshot) => {
            let reviews = [];
            snapshot.docs.forEach((doc) => {
                reviews.push({...doc.data().review, id: doc.id})
            });
            console.log('useEffect', reviews);
            setReviews(reviews);
        });

        return () => unsubscribe();
      },[]);

    return (
        <View style={globalStyles.container}>

            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
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

            <View style={styles.backButton}>
                <Ionicons name="chevron-back" size={22} 
                color="#007AFF" 
                onPress={() => pressHandler()}/>
                <Button 
                    title={'Back'}    
                    onPress={() => pressHandler()}
                />
            </View>

          <Text style={globalStyles.titleText}>{route.params.title}</Text>
          <Ionicons name={isLiked ? "heart" : 'heart-outline'} size={24} color="black" onPress={() => addToWishlist(item)} />
          <Image source={route.params.image} />
          <Text style={styles.price}>{route.params.price}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beschreibung</Text>
            <Text style={styles.description}>{route.params.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bewertungen</Text>
          </View>

          <View style={{flex: 1}}>
            <FlatList 
                data={reviews}
                renderItem={({ item }) => {
                    return (
                    <View>
                        <ReviewCard style={globalStyles.itemCard}>
                            <Text>{item.title}</Text>
                            <Text>{item.body}</Text>
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