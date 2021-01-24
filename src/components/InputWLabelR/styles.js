import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputBox: {
        alignItems: 'center',
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'flex-end',
    },
    labelFrame: {
        height: 1,
        flex: 1,
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        color: '#303030',
        
        marginHorizontal: 3,
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    }
})

export default styles;