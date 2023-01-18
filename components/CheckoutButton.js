// Checkout-Knopf mit bestimmten Design. Beim Anklicken wird der Vibrationsmotor ausgelöst
// und es erscheint eine Meldung auf dem Bildschirm. 

// import from react and react-native
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Vibration, StyleSheet, Alert } from 'react-native';


const CheckoutButton = ({ isEmpty }) => {

    const checkoutHandler = () => {
        // Wenn Warenkorb voll ist, erscheint die Meldung. Wenn er leer ist, passiert beim Anklicken
        // des Buttons nichts (in der mobilen App). 
        if (isEmpty === false) {
            Vibration.vibrate();
            if (Platform.OS === 'web') {
                alert('Vielen Dank für deinen Einkauf! Eine Bestätigungsmail wurde soeben an dich geschickt.');
            } else {
                Alert.alert('Vielen Dank für deinen Einkauf!', 'Eine Bestätigungsmail wurde soeben an dich geschickt.');
            }
        } else {
            if (Platform.OS === 'web') {
                alert('Der Warenkorb ist leer.');
        }
    }
}

    return ( 
        <TouchableOpacity onPress={() => checkoutHandler()}>
            <View style={styles.button}>
                <Text style={styles.text}>Checkout</Text>
            </View>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        margin: 20,
        width: 300,
        alignSelf: 'center',
        borderRadius: 8
    },
    text: {
        fontSize: 25,
        fontFamily: 'nunito-bold',
        color: 'white',
        alignSelf: 'center',
        padding: 10
    }
})
 
export default CheckoutButton;