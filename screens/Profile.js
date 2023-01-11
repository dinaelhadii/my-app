import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import { globalStyles } from '../styles/global';
import Card from '../components/Card';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

const Profile = ({ navigation }) => {

    const handleSignOut = () => {
        signOut(auth).then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

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
                            <Text>{item.title}</Text>
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
                    <Text style={{textAlign: 'center'}}>IMPRESSUM</Text>
                </Card>
                </TouchableOpacity>
            </View>
        </View>
      );
}

export default Profile;