import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    topBox: {
        marginTop: 10,
        flex: 1,
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
        height: '55%',
        backgroundColor: '#FCFCFC',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGroup: {
        width: screenWidth,//because the KeyboardAwareScrollView => width: '100%' dosen't worked
    },
    forgotPasswordBox: {
        flexDirection: 'row',
        width: '80%',
        
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    forgotPasswordText: {
        fontFamily: 'Archivo-SemiBold',
        color: '#303030',
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    buttonBox: {
        alignItems: 'center'
    }
})

export default styles;