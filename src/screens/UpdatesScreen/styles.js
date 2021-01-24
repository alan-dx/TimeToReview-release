import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    updateBox: {
        width: '100%',
        
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textMarker: {
        width: 6, 
        height: 6,
        backgroundColor: '#303030',
        borderRadius: 10,

        margin: 5,
        marginTop: 10
    },
    updateText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 17,
        color: '#303030',
        width: '90%',
        
        textAlign: 'justify'
    },
    updateItemBox: {
        width: '50%',
        marginVertical: 10,
        
        alignItems: 'center',
        
    },
    updateItem: {
        marginBottom: 10,
        width: '100%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateItemText: {
        fontFamily: 'Archivo-Medium',
        color: '#505050',
        fontSize: 15
    },
    feedbackBox: {
        width: '70%',
        alignItems: 'center'
    }
})

export default styles;