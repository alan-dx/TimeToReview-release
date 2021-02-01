import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',

        alignItems: 'center'
    },
    flatlist: {
        flex: 1,
        width: '100%',
    },
    modalInfoBox: {
        padding: 8,
        flex: 1,
    },
    modalInfoTitle: {
        fontWeight: 'bold',
        color: '#303030',
        fontSize: 14
    },
    modalInfoText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 14,
        textAlign: 'justify',
        color: '#303030',
    },
    textMarker: {
        width: 8, 
        height: 8, 
        backgroundColor: '#303030',
        borderRadius: 10,

        marginVertical: 5,
        marginHorizontal: 10
    }
})

export default styles;