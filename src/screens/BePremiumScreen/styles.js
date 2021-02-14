import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',

        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logoBox: {
        backgroundColor: '#FFF',
        width: '90%',
        minHeight: 350,
        borderRadius: 15,
        
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 5
    },
    scrollContainer: {
        padding: 5,
        marginTop: 10
    },
    benefitTitleLabel: {
        fontFamily: 'DancingScript-Bold',
        fontSize: 22,
        color: '#303030',
        textAlign: 'center',

        marginBottom: 10

    },
    benefitLabel: {
        fontFamily: 'Archivo-Medium',
        fontSize: 15,
        color: '#303030',
        textAlign: 'center',
        
        marginTop: 10

    },
    appTitle: {
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
        color: '#303030',
        textAlign: 'center',
    },
    appPriceLabel: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 12,
        marginBottom: -5
    },
    appPrice: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: '#303030',
        textAlign: 'center',
    }
})

export default styles;