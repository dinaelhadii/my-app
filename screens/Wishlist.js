import { ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

const Wishlist = () => {
    return ( 
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.content}>This is the Wishlist Screen!</Text>
        </ScrollView>
     );
}

export default Wishlist;