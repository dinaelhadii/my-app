import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-web';

const SettingsScreen = () => {
    return ( 
        <View style={styles.container}>
            <Text>This is the Settings Screen!</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 24,
        backgroundColor: '#bab',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
 
export default SettingsScreen;