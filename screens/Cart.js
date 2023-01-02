import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-web';

import { globalStyles } from '../styles/global';

const Cart = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Warenkorbinhalt</Text>
        </View>
     );
}

 
export default Cart;