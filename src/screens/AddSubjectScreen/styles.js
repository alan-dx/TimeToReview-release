import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    header: {
        height: '25%',
        maxHeight: 250,
        width: '100%',
        backgroundColor: '#e74e36',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconsBox: {
        width: '96%',
        position: 'absolute',
        justifyContent: 'space-between',
        top: 15,
        flexDirection: 'row'
    },
    iconBack: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'Poppins-Bold',
        color: '#F7F7F7',
        fontSize: 32,
        alignSelf: 'center'
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
    },
    inputBox: {
        alignItems: 'center',
        marginTop: 20
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'flex-end',
    },
    labelFrame: {
        height: 1,
        flex: 1,
        backgroundColor: '#60c3eb',
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        color: '#303030',
        marginHorizontal: 3
    },
    infoInput: {
        height: 100,
        width: '80%',
        borderRadius: 15,
        backgroundColor: '#E8E8E8',
        textAlign: 'center',
        fontFamily: 'Archivo-Bold',
        fontSize: 13,
        color: '#303030'
    },
    dateTimeBox: {
        flexDirection: 'column',
    },
    labelBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    labelTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        marginBottom: 4
    },
    labelBottom: {
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        marginBottom: 4,
    },
})

export default styles;