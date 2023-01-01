import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { globalStyles, images } from '../styles/global';

import Card from '../components/Card';

const ProductDetails = ({ route, navigation }) => {

    const item = route.params.item;

    return (
        <View style={globalStyles.container}>
          <Text>{route.params.title}</Text>
          {/* Display other item details here */}
        </View>
      );
    }

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    price: {
        textAlign: 'right'
    },
})
 
export default ProductDetails;