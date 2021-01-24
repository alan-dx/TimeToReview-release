import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    topBox: {
        marginTop: 10,
        height: '35%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    topBoxLine: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtn: {
        position: 'absolute',
        left: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 30,
    },
    logoBox: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectBox: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGroup: {
        width: screenWidth,//because the KeyboardAwareScrollView => width: '100%' dosen't worked
        height: 500
    },
    buttonBox: {
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",

        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 5
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        fontFamily: 'Archivo-Medium',
        fontSize: 12,
        color: '#303030'
    },
})

export default styles;