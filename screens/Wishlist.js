import { View, Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { globalStyles } from '../styles/global';

const Wishlist = ({ route }) => {

    const [wishlist, setWishlist] = useState([])
    const item = route.params;
    console.log(item);

    useEffect(() => {
        if ( item && !wishlist.includes(item)) {
            setWishlist([...wishlist, item]);
        }
    }, [item])

    return ( 
        <FlatList 
            data={wishlist}
            renderItem={({ item }) => {

            return (
            <TouchableOpacity>
                <Card style={styles.itemCard}>
                    <Text>{item.title}</Text>
                    <Text>{item.price}</Text>
                    <View>
                        <Image source={ (item.image) } />
                    </View>
                </Card>
            </TouchableOpacity>
            )}}
            keyExtractor={(item) => item.id}
        />
    );
}

export default Wishlist;