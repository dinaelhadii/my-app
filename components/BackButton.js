// import from react-native-modules
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

// import icons
import { Ionicons } from '@expo/vector-icons';

// import styles and components
import { globalStyles } from '../styles/global';

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