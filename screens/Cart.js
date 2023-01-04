import { View, Text, Image } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';

const Cart = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Warenkorbinhalt</Text>
            <Image source={require('../assets/icon.png')} 
            style={styles.image} />
        </View>
     );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    }
    
})

 
export default Cart;