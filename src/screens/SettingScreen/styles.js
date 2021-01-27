import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    header: {
        height: '30%',

        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profilePhotoBox: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#FFF',
        elevation: 2,

        alignItems: 'center',
        justifyContent: 'center'
    },
    profileName: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
    },
    profileEmail: {
        color: '#707070',
        fontFamily: 'Archivo-Normal',
        fontSize: 14
    },
    body: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#FFF',
        
        flex: 1,
        marginTop: 10,

        elevation: 7
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
    devBox: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
    },
    devBoxButtons: {
        flexDirection: 'row', 
        width: '50%',
        justifyContent: 'space-evenly',
        marginTop: 3,
    },
    timeModalScrollBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    timeModalScrollLabel: {
        fontSize: 17,
        color: '#303030',
        fontFamily: 'Archivo-Bold'
    },
    timeModalTimerScroll: {
        height: 90,
        width: 85,
        alignItems: 'center',
        flexDirection: 'row',
    },
    timeModalScrollItem:{
        width: 40,
        height: 30,
        alignItems: 'center'
    },
    timeModalScrollText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 17,
        color: '#303030',
    },
    timeModalScrollSelectItemLeft: {
        width: 40,
        height: 30,
        borderTopColor: '#60c3eb',
        borderTopWidth: 1,
        borderBottomColor: '#60c3eb',
        borderBottomWidth: 1,
        
        position: 'absolute',
        top: 30
    },
    timeModalScrollSelectItemRight: {
        width: 40,
        height: 30,
        borderTopColor: '#60c3eb',
        borderTopWidth: 1,
        borderBottomColor: '#60c3eb',
        borderBottomWidth: 1,
        
        position: 'absolute',
        top: 30,
        right: 0
    },
    reportModalInfoBox: {
        width: '95%',

        marginVertical: 5,
        flexDirection: 'row',
    },
    reportModalInfoText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 16,
        textAlign: 'justify',
        color: '#303030',
    },
    textMarker: {
        width: 6, 
        height: 6, 
        backgroundColor: '#303030',
        borderRadius: 10,

        margin: 5
    },
    reportModalCustomButton: {
        height: 50,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#60c3eb',

        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reportModalCustomButtonText: {
        fontFamily: 'Poppins-Bold',
        color: '#FFF',
        fontSize: 19
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
    },
    bodyScrollButton: {
        alignSelf: 'center',
        padding: 5
    }
})

export default styles;