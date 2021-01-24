import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    scrollContainer: {
        alignItems: 'center'
    },
    totalReviewsText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 18,
        color: '#303030',

        marginBottom: 5
    },
    performanceItemBox: {
        width: '95%',
        backgroundColor: '#FFF',
        borderRadius: 15,

        elevation: 2,
        marginTop: 2,
        marginBottom: 10,
        alignItems: 'center',
    },
    textBold: {
        marginTop: 5,
        fontFamily: 'Archivo-Bold',
        fontSize: 17,
        color: '#303030'
    },
    lineChartPieBox: {
        marginTop: 2,
        height: 1,
        width: '90%',
        backgroundColor: '#60c3eb'
    },
    subLineChartPieBox: {
        width: '90%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 14,
        color: '#606060',

        marginBottom: 3
    }
})

export default styles;