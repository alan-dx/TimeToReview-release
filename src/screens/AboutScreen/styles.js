import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    aboutBox: {
        width: '100%',
        flex: 1,
    },
    logoBox: {
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textMarker: {
        width: 6, 
        height: 6,
        backgroundColor: '#303030',
        borderRadius: 10,

        margin: 5,
        marginTop: 10
    },
    aboutTextBox: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    aboutText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 16,
        color: '#303030',
        width: '90%',
        
        textAlign: 'justify'
    },
    aboutItem: {
        marginBottom: 10,
        width: '100%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleChart: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Archivo'
    }
})

export default styles;