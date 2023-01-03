import { View, StyleSheet, Text, Image, Button, FlatList } from 'react-native';
import { globalStyles, images } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = ({ route, navigation }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [item, setItem] = useState(null);

    const addToWishlist = (likedItem) => {
        setIsLiked(!isLiked);
        setItem(likedItem);
    }

    const pressHandler = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.backButton}>
                <Ionicons name="chevron-back" size={22} 
                color="#007AFF" 
                onPress={() => pressHandler()}/>
                <Button 
                    title={'Back'}    
                    onPress={() => pressHandler()}
                />
            </View>

          <Text style={globalStyles.titleText}>{route.params.title}</Text>
          <Ionicons name={isLiked ? "heart" : 'heart-outline'} size={24} color="black" onPress={() => addToWishlist(item)} />
          <Image source={route.params.image} />
          <Text style={styles.price}>{route.params.price}</Text>

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