import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingRight: 15,
        paddingLeft: 15,
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 10
    },
    productTitle: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    },
    text: {
        fontFamily: 'nunito-regular',
        fontSize: 14
    },
      impressum: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    input: {
        borderWidth: 3,
        borderColor: 'black',
        padding: 10,
        fontSize: 18,
        borderRadius: 8,
        margin: 20,
        backgroundColor: '#b3d7ff',
    },
})

export const images = StyleSheet.create({
    ratings: {
        '1': require('../assets/rating-1.png'),
        '2': require('../assets/rating-2.png'),
        '3': require('../assets/rating-3.png'),
        '4': require('../assets/rating-4.png'),
        '5': require('../assets/rating-5.png'),
    }
})
