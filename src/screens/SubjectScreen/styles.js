import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    flatlist: {
        flex: 1
    },
    adBox: {
        width: '100%',
        backgroundColor: '#FCFCFC',
        borderTopColor: '#DDD',
        borderTopWidth: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    adBoxLabel: {
        fontFamily: 'Archivo-Medium',
        fontSize: 12,
        color: '#303030',
        textAlign: 'center',

        zIndex: -1,
        position: 'absolute'
    }
})

export default styles;