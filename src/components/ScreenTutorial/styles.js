import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    floatAddButton: {
        width: 75,
        height: 75,
        borderRadius: 40,
        backgroundColor: '#60c3eb',

        alignItems: 'center',
        justifyContent: 'center'
    },
    desciptionText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        textAlign: 'center',
        
        marginTop: 20
    },
    timerCountReviews: {
        width: 35,
        height: 20,
        backgroundColor: '#60c3eb',
        borderRadius: 6,
        elevation: 4,

        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        color: '#F5F5F5',
        fontFamily: 'Archivo-Bold',
        fontSize: 12,
    },
    timerText2: {
        color: '#303030',
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        textAlign: 'center'
    },
    timerBox: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 2,
    },
    timerController: {
        height: 30,
        width: 30,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        borderRadius: 8,
        
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
    
})

export default styles;