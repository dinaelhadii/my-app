// import from react and react-native
import { View, Text, TouchableOpacity } from 'react-native';
import { Vibration, StyleSheet, Alert } from 'react-native';


const CheckoutButton = () => {

    const checkoutHandler = () => {
        Vibration.vibrate();
        Alert.alert('Vielen Dank für deinen Einkauf!', 'Eine Bestätigungsmail wurde soeben an dich geschickt.');
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
        alignSelf: 'center'
    },
    text: {
        fontSize: 25,
        fontStyle: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 10
    }
})
 
export default CheckoutButton;