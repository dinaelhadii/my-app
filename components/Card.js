// Eine Card-Komponente, welche das Design verbessern soll. Dient dazu einzelne
// Elemente einer Liste in einer einzelnen 'Karte' einheitlich darzustellen

// import from react-native
import { StyleSheet, View } from "react-native";

const Card = (props) => {
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
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 3,
        marginVertical: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    }
});
 
export default Card;