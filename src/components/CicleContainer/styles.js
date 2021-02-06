import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    timerBox: {
        width: Dimensions.get('screen').width,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 3,
    },
    timerCountReviews: {
        width: 40,
        height: 25,
        backgroundColor: '#60c3eb',
        borderRadius: 6,
        elevation: 4,

        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        color: '#F5F5F5',
        fontFamily: 'Archivo-Bold',
        fontSize: 14,
    },
    timerText2: {
        color: '#303030',
        fontFamily: 'Archivo-Bold',
        fontSize: 12,
        textAlign: 'center'
    },
    timerController: {
        height: 35,
        width: 35,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        borderRadius: 7,
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timerChronometer: {
        height: 25,
        backgroundColor: '#e74e36',
        width: 70,
        borderRadius: 6,
        elevation: 3,

        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;