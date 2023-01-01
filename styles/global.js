import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 20
    },
    titleText: {
        fontFamily: 'nunito-bold',
    },
    text: {
        fontFamily: 'nunito-regular',
    }
})

export const images = StyleSheet.create({
    rating: {
        '1': require('../assets/rating-1.png'),
        '2': require('../assets/rating-2.png'),
        '3': require('../assets/rating-3.png'),
        '4': require('../assets/rating-4.png'),
        '5': require('../assets/rating-5.png'),
    }
})
