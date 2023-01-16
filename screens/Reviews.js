// import from react and react-native
import { useState, useEffect } from 'react';
import { 
    View, StyleSheet, Text, Image, 
    Button, FlatList, Modal, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native';

// import icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// import from firebase and firebase-related files
import { addDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';

// import styles and components
import { globalStyles, images } from '../styles/global';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../screens/ReviewForm';
import BackButton from '../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Reviews = ({ route, navigation }) => {

    const productID = route.params;

    const [modalOpen, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    const reviewRef = collection(db, 'products', productID, 'reviews');

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

        <View style={globalStyles.container}>
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

            <View>
                <BackButton navigation={navigation}/>
                <Text style={globalStyles.titleText}>Bewertungen</Text>
                <FlatList 
                    data={reviews}
                    renderItem={({ item }) => {
                        let rating = item.rating;
                        console.log(rating);
                        return (
                        <View>
                            <ReviewCard style={globalStyles.itemCard}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.body}>{item.body}</Text>
                                <View style={styles.rating}>
                                    {Array(rating).fill(<AntDesign name="star" size={24} color="black" />)}
                                </View>
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
    title: {
        marginBottom: 8,
        fontFamily: 'nunito-bold',
        fontSize: 20,
    },
    body: {
        marginBottom: 8,
        fontFamily: 'nunito-regular',
        fontSize: 16,
    },
    rating: {
        margin: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
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

export default Reviews;

