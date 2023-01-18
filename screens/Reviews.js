// Hier werden die Bewertungen mittels FlatList in einer Liste dargestellt.

// import from react and react-native
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Modal, 
    TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

// import styles and icons
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// import from firebase and firebase-related files
import { addDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';

// import components
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import BackButton from '../components/BackButton';
import AppButton from '../components/AppButton';

const Reviews = ({ route, navigation }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const productID = route.params;
    const reviewRef = collection(db, 'products', productID, 'reviews');

    // Bei jeder Änderungen des Arrays in Firestore, welche die Bewertungen speichert,
    // wird das lokale Array 'reviews' mittels useState geupdatet. 
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

      // Siehe ReviewForm.js. Beim Triggern der Funktion werden die eingegebenen Daten übergeben
      // und zur subcollection 'reviews' in Firestore als neues Bewertungs-Dokument hinzugefügt.
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

    // Wenn diese Prüfung nicht erfolgt, ist die Eingabe von Text in Input-Feldern im Browser nicht möglich.
    // Keyboard.dismiss
    function dismissKeyboard() {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    }
    return ( 
        // Das Modal ist wie ein eigenes Fenster, welches je nach Wert von modalOpen angezeigt wird oder nicht.
        // Es enthält das Formular zur Eingabe einer Bewertung. Durch Klicken auf das Icon 'close' wird es 
        // geschlossen. Der Klick auf den Button 'Bewertung hinzufügen' öffnet es.
        // Wenn die Tastatur offen ist, kann diese weggeklickt werden, indem der Nutzer
        // auf einem beliebigen Punkt auf dem Bildschirm drückt (Keyboard.dismiss).
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback
                onPress={() => dismissKeyboard()}>
                    <View style={[globalStyles.container]}>
                        <MaterialIcons 
                        name='close'
                        size={24}
                        style={styles.modalToggle}
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
                        return (
                        <View>
                            <ReviewCard style={globalStyles.itemCard}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.body}>{item.body}</Text>
                                <View style={styles.rating}>
                                    {Array.from({length: item.rating}, () => (<AntDesign name="star" size={24} color="black" />))}
                                </View>
                            </ReviewCard>
                        </View>
                        )}}
                        keyExtractor={(item) => item.id}
                />
                <AppButton title={'Bewertung hinzufügen'} pressHandler={() => setModalOpen(true)} />
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
        marginTop: 50,
        borderWidth: 4,
        borderColor: '#3395ff',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
})

export default Reviews;

