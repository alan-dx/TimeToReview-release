import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
    },
    header: {
        flex: 2,

        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    welcomeText: {
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
        color: '#303030',

        marginBottom: 10
    },
    profilePhotoBox: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#FFF',
        elevation: 4,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileNameBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileEmailBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
        marginBottom: 10
    },
    editButton: {
        width: 20,
        height: 20,

        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileEmail: {
        color: '#707070',
        fontFamily: 'Archivo-Normal',
        fontSize: 14
    },
    infoText: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 17,

        marginTop: 8,
    },
    menuBox: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFF',

        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10,
        
        elevation: 20,
    },
    optionContainer: {
        height: 40,
        borderRadius: 20,

        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 8,
    },
    optionText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15
    },
    modalNameBody: {
        flex: 1,
        width : '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalNameInputLabel: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 16,
        textAlign: 'justify',
        color: '#303030',

        marginBottom: 10
    },
    modalNameInput: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    },
    optionPictureText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 14
    },
    optionPictureBox: {
        flexDirection: 'row',
        width: '100%',

        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    optionPicture: {
        flexDirection: 'column',

        alignItems: 'center',
    }
})

export default styles;