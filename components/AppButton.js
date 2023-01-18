// Wiederverwendbarer Button mit bestimmten Design. Beim Anklicken wird die Funktion 
// getriggert, die dem prop 'pressHandler' in der Komponente übergeben wird. Der Button-Text
// wird ebenfalls einem prop übergeben.

// import from react and react-native
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const AppButton = ({ pressHandler, title }) => {
    return ( 
        <TouchableOpacity onPress={() => pressHandler()}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2997FF',
        borderRadius: 10,
        padding: 10,
        margin: 30,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'nunito-bold',
        alignSelf: 'center',
        color: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
})
 
export default AppButton;