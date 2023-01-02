import { ScrollView, Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

const Wishlist = () => {
    return ( 
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.text}>This is the Wishlist Screen!</Text>
        </ScrollView>
     );
}

export default Wishlist;