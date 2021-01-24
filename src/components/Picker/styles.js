import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 54,
        width: '100%', 
    },
    picker: {
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15,
        backgroundColor: '#E8E8E8',
        width: '80%',
    },
    dropdown: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#E8E8E8',
        borderTopColor: '#E8E8E8',
        width: '80%',
        height: 98,
        
        marginTop: -10,
        elevation: 1
    },
    label: {
        fontFamily: 'Archivo-SemiBold',
        color: '#ABABAB',
        fontSize: 13,
        textAlign: 'center'
    }
})

export default styles;
