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
                https://img01.ztat.net/article/spp-media-p1/6c2034749baf3b9b9a72a37195f35ce1/7e2453baae044cf2a18e9bb85d56958b.jpg?imwidth=1800&filter=packshot {"\n"}
                https://cdn02.plentymarkets.com/k3m1tzhdow93/item/images/4336106/full/damen-t-shirt-tshirt-grosse-groesse-blumen-blau.jpg{"\n"}
                https://www.prada.com/content/dam/pradabkg_products/2/292/292065/11A9F0009/292065_11A9_F0009_S_222_SLF.jpg/jcr:content/renditions/cq5dam.web.hebebed.1000.1000.crop.jpg{"\n"}
                https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO?wid=800&hei=800&fmt=jpg&qlt=85,1&op_sharpen=0&resMode=sharp2&op_usm=1,1,1,0{"\n"}
                https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8d7e5e70-1cff-447b-bc0c-ac05eb81df68/air-force-1-07-lv8-herrenschuh-kLnMBL.png{"\n"}
                https://i.pinimg.com/originals/67/51/40/6751409fa85ff05bd54ee665ece0d01b.jpg{"\n"}
                https://www.birkenstock.com/on/demandware.static/-/Sites-master-catalog/default/dwf007a60a/1020526/1020526.jpg{"\n"}
                https://cdn.shopify.com/s/files/1/0070/7693/7775/products/VogueCollection_Pullover_creme_schwarz_1_1800x.jpg?v=1658998330{"\n"}
                https://i.postimg.cc/d3wXb41X/louisvuitton-tiger-mit-gesticktem-logo.jpg{"\n"}
                https://i.otto.de/i/otto/407d3828-7396-558f-b1bf-143b76c341d0?h=520&w=551&sm=clamp{"\n"}
                </Text>
            </View>
        </ScrollView>

     );
}
 
export default Impressum;