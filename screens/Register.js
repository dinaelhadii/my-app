
// import from react and react-native
import { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Keyboard, TouchableOpacity, 
    TouchableWithoutFeedback, Text, Platform, Vibration, Alert } from "react-native";

// import from firebase and firebase-related file
import { auth, db } from "../firebase";
import { addDoc, setDoc, onSnapshot, collection, doc, getDoc, query } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// import icons
import { FontAwesome } from '@expo/vector-icons';

const Register = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Funktion vom Firebase-Authentifikationsservice. Beim Eingeben der Daten und bei Klick
    // auf den Knopf, wird diese Funktion getriggert. Mittels usestate werden Name, Passwort und Email
    // gespeichert und an die Firebase-Funktion übergeben. Es wird in Firestore ein User-Dokument
    // in der users-collection erstellt. Jeder User hat einen eigenen Warenkorb und eine Wunschliste (Arrays,
    // welche die Produkte als maps speichern.)
    // Beim erfolgreichen SignUp wird zur NavBar navigiert und der Vibrationsmotor ausgelöst.
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    email: email,
                    password: password,
                    id: user.uid,
                    wishlist: [],
                    cart: []
                });
                navigation.navigate('NavBar');
                Vibration.vibrate([400]);
            })
            // Fehlermeldungen je nach Firebase error-code.
            .catch(error => {
                switch(error.code) {
                    case 'auth/invalid-email':
                        if (Platform.OS === 'web') {
                            alert('Ungültige E-Mail.')
                        } else {
                            Alert.alert('Ungültige E-Mail.'); }
                        break;
                    case 'auth/email-already-in-use':
                        if (Platform.OS === 'web') {
                            alert('E-Mail vergeben.')
                        } else {
                            Alert.alert('E-Mail vergeben.'); }
                        break;
                    case 'auth/weak-password':
                        if (Platform.OS === 'web') {
                            alert('Bitte wählen Sie ein starkes Passwort.')
                        } else {
                            Alert.alert('Bitte wählen Sie ein starkes Passwort.') }
                    case 'auth/internal-error':
                        if (Platform.OS === 'web') {
                            alert('Bitte stellen Sie sicher, dass E-Mail und Passwort eingegeben sind.')
                        } else {
                            Alert.alert('Fehler', 'Bitte stellen Sie sicher, dass E-Mail und Passwort eingegeben sind.') }
                }
            })
    }

    // siehe Login.js.
    function dismissKeyboard() {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    }

    return ( 
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
                <View style={styles.appLogo}>
                <FontAwesome name="shopping-bag" size={80} color="black" />
                </View>
            <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Name'
                        autoCapitalize=''
                        keyboardType=''
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input}
                    />
                    <TextInput 
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput 
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text) }
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={() => handleSignUp()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appLogo: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
})
 
export default Register;