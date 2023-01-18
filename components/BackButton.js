// Wiederverwendbarer Button mit bestimmten Design. Beim Anklicken wird die aktuelle Bildschirmseite 
// des Stacks weg-"gepoppt" und zur vorherigen Bildschirmseite zurück navigiert.

// import from react-native
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

// import styles and icons
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation }) => {
    return ( 
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={globalStyles.backButton}>
                <Ionicons name="chevron-back" size={22} 
                color="#fff" />
                <Text style={styles.buttonText}>Zurück</Text>
            </View>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontFamily: 'nunito-bold',
        alignSelf: 'center',
        color: '#fff'
    },
})
 
export default BackButton;