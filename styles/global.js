import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingRight: 10,
        paddingLeft: 10,
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    },
    sectionText: {
        fontFamily: 'nunito-bold',
        fontSize: 26,
        marginTop: 10,
        marginBottom: 10,
    },
    productTitle: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    },
    text: {
        fontFamily: 'nunito-regular',
        fontSize: 14
    },
    errorText: {
        alignSelf: 'center',
        fontFamily: 'nunito-regular'
    },
      impressum: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    input: {
        borderWidth: 3,
        fontFamily: 'nunito-regular',
        borderColor: 'black',
        padding: 10,
        fontSize: 18,
        borderRadius: 8,
        margin: 20,
        marginBottom: 10,
        backgroundColor: 'skyblue',
    },
    backButton: {
        backgroundColor: '#2997FF',
        width: 100,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignSelf: 'flex-start', 
        alignItems: 'center',
    },
})