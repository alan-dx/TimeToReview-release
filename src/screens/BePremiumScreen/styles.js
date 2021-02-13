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
        minHeight: 300,
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

    }
})

export default styles;