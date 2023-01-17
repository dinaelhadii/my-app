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

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Logged in with: ', user.email);
                Vibration.vibrate([400]);
            })
            .catch(error => {
                console.log(error.code);
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
                }
            });
    }

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