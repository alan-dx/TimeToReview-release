import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    flatlist: {
        flex: 1
    },
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        height: 250,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    modalHeader: {
        width: '100%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#303030',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around"
    },
    modalHeaderText: {
        marginTop: 6,
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 20
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    infoBox: {
        width: '90%',
    },
    infoText: {
        fontFamily: 'Archivo',
        fontSize: 14,
        textAlign: 'center',
        color: '#303030'
    },
    buttonBox: {
        flexDirection: 'row'
    },
    routineModalInfoBox: {
        width: '90%',
    },
    routineModalInfoText: {
        fontFamily: 'Archivo',
        fontSize: 14,
        textAlign: 'center',
        color: '#303030',

        marginTop: 10
    },
    modalRoutineInput: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    },
    adBox: {
        width: '100%',
        backgroundColor: '#FCFCFC',

        alignItems: 'center',
        justifyContent: 'center'
    },
    adBoxLabel: {
        fontFamily: 'Archivo-Medium',
        color: '#FFFFFF',
        fontSize: 14,
        color: '#303030',
        textAlign: 'center',

        zIndex: -1,
        position: 'absolute'
    }
})

export default styles;