import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: "center",
        justifyContent: 'space-evenly',
        position: 'relative',
    },
    modalHeader: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    headerTitleBox: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 17
    },
    modalBody: {
        flex: 1,
        width: '100%',
        
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles