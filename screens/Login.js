import { View, KeyboardAvoidingView, TextInput, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }) => {

    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('NavBar', userName)
                console.log(userName);
            }
        })

        return unsubscribe;
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Logged in with: ', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Registered with', user.email);
            })
            .catch(error => alert(error.message))
    }

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        value={userName}
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
                        onPress={() => handleLogin}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => handleSignUp()}
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
    buttonOutLine: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    }
})
 
export default Login;