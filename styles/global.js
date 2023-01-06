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
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    text: {
        fontFamily: 'nunito-regular',
        fontSize: 14
    },
    itemCard: {
        padding: 10,
      },
      impressum: {
        flex: 1,
        justifyContent: 'flex-end'
    },
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
