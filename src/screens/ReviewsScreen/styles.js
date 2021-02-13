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
        width: '100%',
        alignSelf: 'center'
    },
    adBox: {
        width: '100%',
        backgroundColor: '#FCFCFC',
        borderTopColor: '#DDD',
        borderTopWidth: 1,

        alignItems: 'center',
        alignSelf: 'center',
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