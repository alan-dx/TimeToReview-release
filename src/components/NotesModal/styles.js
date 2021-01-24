import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalCard: {
        minHeight: 400,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: 'center',
        position: 'relative'
    },
    titleBox: {
        flexDirection: 'row',
        width: '100%',
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    titleLabelBox: {
        width: '80%',
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 18,
        color: '#303030'
    },
    closeButton: {
        backgroundColor: '#FFF',
    borderRadius: 50,

        position: 'absolute',
        left: 8
    },
    notesBox: {
        width: '90%',
        flex: 1,
        
        marginVertical: 10,
        padding: 5,
        position: 'relative'
    },
    noteText: {
        fontSize: 15,
        fontFamily: 'Archivo-Medium',
        color: '#303030'
    }
})

export default styles;