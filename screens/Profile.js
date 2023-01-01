import { View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

const Profile = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Dein Profil</Text>
        </View>
     );
}

export default Profile;