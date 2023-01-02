import { View, StyleSheet, Text, Image, Button, FlatList } from 'react-native';
import { globalStyles, images } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';

const ProductDetails = ({ route, navigation }) => {

    const pressHandler = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.backButton}>
                <Ionicons name="chevron-back" size={22} color="#007AFF" />
                <Button 
                    title={'Back'}    
                    onPress={() => pressHandler()}
                />
            </View>
          <Text style={globalStyles.titleText}>{route.params.title}</Text>
          <Text style={styles.price}>{route.params.price}</Text>
          <Image source={route.params.image} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beschreibung</Text>
            <Text style={styles.description}>{route.params.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bewertungen</Text>
          </View>
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
        textAlign: 'left',
        marginTop: 10,
        fontSize: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    section: {
        paddingTop: 18,
    },
    sectionTitle: {
        fontSize: 23,
        fontFamily: 'nunito-bold',
    },
    description: {
        fontFamily: 'nunito-regular',
        marginTop: 2,
    }
})
 
export default ProductDetails;