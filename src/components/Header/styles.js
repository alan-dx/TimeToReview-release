import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#303030',
        marginTop: 4
    },
    buttonBox: {
        backgroundColor: '#FFF',
        borderRadius: 8,

        position: 'absolute', 
        left: '2%', 

        elevation: 7
    },
    buttonContainer: {
        width: 35,
        height: 35,
        borderRadius: 8,
        backgroundColor: '#e74e36',

        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default styles;