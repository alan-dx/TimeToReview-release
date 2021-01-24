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
        
        marginTop: 20
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
})

export default styles;