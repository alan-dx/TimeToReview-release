import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 80,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 2
    },
    titleBox: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    titleSubject: {
        fontFamily: 'Archivo-Bold',
        fontSize: 18,
        color: '#303030'
    },
    label: {
        marginBottom: -2,
        fontFamily: 'Poppins-Bold',
        fontSize: 11,
        color: '#303030',
        justifyContent: 'flex-end',
    },
    subjectColorMarker: {
        width: 5,
        height: 80,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0
    },
    infoBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    infoButtonBox: {
        width: '30%',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        marginTop: 2,
        color: '#FCFCFC',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 11
    },
})

export default styles;