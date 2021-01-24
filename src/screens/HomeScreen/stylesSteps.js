import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 340
        //modal height = 400
    },
    desciptionText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        textAlign: 'center',

        color: '#303030'
    },
    floatAddButton: {
        width: 75,
        height: 75,
        borderRadius: 40,
        backgroundColor: '#60c3eb',

        alignItems: 'center',
        justifyContent: 'center'
    },
    logoBox: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default styles;