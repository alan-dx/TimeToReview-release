import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    flatlist: {
        height: '90%',
        marginTop: 10,
    },
    flatlistCycle: {
        width: '90%',
        alignSelf: 'center'
    },
    adBox: {
        width: '100%',
        backgroundColor: '#FCFCFC',

        alignItems: 'center',
        justifyContent: 'center'
    },
    adBoxLabel: {
        fontFamily: 'Archivo-Medium',
        color: '#FFFFFF',
        fontSize: 14,

        textAlign: 'center'
    }
})

export default styles;