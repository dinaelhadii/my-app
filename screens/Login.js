// import from react and react-native
import { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Keyboard, 
    TouchableOpacity, TouchableWithoutFeedback, Text, Platform, Vibration, Alert } from "react-native";

// import from firebase and firebase-related file
import { auth, db } from "../firebase";
import { addDoc, onSnapshot, collection, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// import icons
import { FontAwesome } from '@expo/vector-icons';
import AppButton from "../components/AppButton";

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Authentifizierung erfolgt mit Firebase. 
    const handleLogin = () => {
        // auth wurde in firebase.js definiert. Beim Login wird der Vibrationsmotor ausgelöst. 
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                Vibration.vibrate([400]);
            })
            // Falls Fehler auftreten, erscheinen Fehlermeldung abhängig vom Firebase error-code.
            .catch(error => {
                switch(error.code) {
                    case 'auth/wrong-password':
                        if (Platform.OS === 'web') {
                            alert('Falsches Passwort')
                        } else {
                            Alert.alert('Falsches Passwort'); }
                        break;
                    case 'auth/internal-error':
                        if (Platform.OS === 'web') {
                            alert('Bitte stellen Sie sicher, dass E-Mail und Passwort eingegeben sind.')
                        } else {
                            Alert.alert('Fehler', 'Bitte stellen Sie sicher, dass E-Mail und Passwort eingegeben sind.') }
                            break;
                    case 'auth/invalid-email':
                        if (Platform.OS === 'web') {
                            alert('Ungültige E-Mail')
                        } else {
                            Alert.alert('Ungültige E-Mail'); }
                        break;
                    case 'auth/user-not-found':
                        if (Platform.OS === 'web') {
                            alert('Nutzer nicht gefunden')
                        } else {
                            Alert.alert('Nutzer nicht gefunden')
                        }
                }
            });
    }

    // Wenn diese Prüfung nicht erfolgt, ist die Eingabe von Text in Input-Feldern im Browser nicht möglich.
    function dismissKeyboard() {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    }

    return ( 
        // Wenn die Tastatur offen ist, kann diese weggeklickt werden, indem der Nutzer
        // auf einem beliebigen Punkt auf dem Bildschirm drückt (Keyboard.dismiss).
        // Die einzelnen TextInput-Komponenten speichern den eingegeben Inhalt und
        // übergeben diesen an die set-Funktionen, um die Nutzerdaten prüfen zu können.
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
                <View style={styles.appLogo}>
                <FontAwesome name="shopping-bag" size={80} color="black" />
                <Text style={styles.appText}>ShoppingSky</Text>
                </View>
            <View style={styles.inputContainer}>
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
                        onPress={() => handleLogin()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                        style={[styles.button, styles.buttonOutLine]}>
                        <Text style={styles.buttonOutlineText}>Register</Text>
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
    appText: {
        fontFamily: 'pacifico-regular',
        fontSize: 60
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
        fontSize: 18,
    },
    buttonOutLine: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 18,
    }
})
 
export default Login;