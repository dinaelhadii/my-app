// import from react-native
import { ScrollView, View, Text, StyleSheet } from 'react-native';

// import styles
import { globalStyles } from '../styles/global';

const Impressum = ({ route }) => {
    return ( 
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.titleText}>Impressum</Text>
            <View>
                <Text style={globalStyles.text}>
                    ShoppingSky.de GmbH {"\n"} {"\n"}
                    Dina El-Hadi {"\n"}
                    Munzur Yalcin {"\n"} {"\n"}
                    Musterstr. 40 {"\n"}
                    42732 Musterstadt {"\n"}
                    Deutschland {"\n"}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 7}}> 
                Kontakt </Text>
                <Text style={globalStyles.text}>
                Telefon: +49 87 123456 {"\n"}
                FAX: +49 80 123456 {"\n"}
                E-Mail: support@shoppingsky.de {"\n"}
                Internet: www.shoppingsky.de {"\n"} {"\n"}
                </Text>
                <Text style={globalStyles.text}>
                ShoppingSky ist ein in Deutschland eingetragenes Unternehmen. {"\n"}
                Registergericht: Amtsgericht Osnabrück {"\n"}
                Registernummer: HRA 204127 {"\n"}
                </Text>
                <Text style={globalStyles.text}>
                Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz: {"\n"}
                DE294643556 {"\n"} 
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Bildnachweis:</Text>
                <Text style={globalStyles.text}>
                Siehe GitHub
                </Text>
            </View>
        </ScrollView>

     );
}
 
export default Impressum;