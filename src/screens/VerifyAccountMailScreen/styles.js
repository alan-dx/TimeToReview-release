import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',

        alignItems: "center",
        justifyContent: 'center'
    },
    infoTextBox: {
        width: '90%',

        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#303030',
        textAlign: 'center',
        
        marginVertical: 10
    },
    mailText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 17,
        color: '#303030'
    }
})

export default styles