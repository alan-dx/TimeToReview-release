import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 340
        //modal height = 400
    },
    floatAddButton: {
        width: 75,
        height: 75,
        borderRadius: 40,
        backgroundColor: '#60c3eb',

        alignItems: 'center',
        justifyContent: 'center',

        elevation: 4
    },
    desciptionText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        textAlign: 'center',
        
        marginTop: 20,
        color: '#303030',
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

        color: '#303030'
    },
    timerText2: {
        color: '#303030',
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        textAlign: 'center',

        color: '#303030'
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
    },
    performanceChartIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#303030',
        borderWidth: 2,

        alignItems: "center",
        justifyContent: 'center'
    },
    performanceChartIconLabel: {
        fontFamily: 'Archivo-SemiBold',
        color: '#FFF',
        fontSize: 15
    }
    
})

export default styles;