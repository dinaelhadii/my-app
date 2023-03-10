// import from react-native
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

// import from firebase and firebase-related file
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

// import styles and components
import { globalStyles } from '../styles/global';
import Card from '../components/Card';

const Profile = ({ navigation }) => {

    // Ausloggen durch Klicken auf die Card-Komponente 'Log Out' mittels Firebase-Authentifikationsservice.
    const handleSignOut = () => {
        signOut(auth).then(() => {
                navigation.navigate('HomeStack');
            })
            .catch(error => alert(error.message))
    }

    // Inhalt der Card-Komponenten
    const profileOps = [
        {title: 'Meine Bestellungen', key: '1'},
        {title: 'Abonnements', key: '2'},
        {title: 'Persönliche Daten', key: '3'},
        {title: 'App-Einstellungen', key: '4'},
        {title: 'Log Out', key: '5'},
    ]

    return (
        <View style={globalStyles.container}>
            <View>
                <Text style={globalStyles.titleText}>Signed in: {auth.currentUser?.email}</Text>
                <FlatList
                data={profileOps}
                renderItem={({ item }) => {
                return (
                    <View>
                    <TouchableOpacity onPress={() => {
                        if (item.key === '5') {
                        handleSignOut()}}}>
                        <Card style={globalStyles.itemCard}>
                            <Text style={globalStyles.text}>{item.title}</Text>
                        </Card> 
                    </TouchableOpacity>
                    </View>
                    )}}
                keyExtractor={(item) => item.key}
                />
            </View>
            <View style={globalStyles.impressum}>
                <TouchableOpacity onPress={() => navigation.navigate('Impressum')}>
                <Card>
                    <Text style={[{textAlign: 'center'}, globalStyles.text]}>IMPRESSUM</Text>
                </Card>
                </TouchableOpacity>
            </View>
        </View>
      );
}

export default Profile;