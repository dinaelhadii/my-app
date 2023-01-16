// Ähnlich der Card-Komponente aber mit anderem Design.

// import from react-native
import { StyleSheet, View } from "react-native";

const ReviewCard = (props) => {
    return ( 
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});
 
export default ReviewCard;