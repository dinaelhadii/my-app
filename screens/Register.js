import { View, KeyboardAvoidingView, TextInput, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Text, Platform } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { addDoc, setDoc, onSnapshot, collection, doc, getDoc, query } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';
import { Vibration } from "react-native";

const Register = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Registered with', user.email);
                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    email: email,
                    password: password,
                    id: user.uid,
                    wishlist: [],
                });
                navigation.navigate('NavBar');
                Vibration.vibrate([400]);
            })
            .catch(error => alert(error.message))
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