import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 8,
        borderRadius: 10,

        elevation: 2
    },
    infoBox: {
        flexDirection: 'row',
        flex: 1,
        width: '90%',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alertIcon: {
        position: 'absolute',
        paddingTop: 6,
        right: -7,
    },
    titleBox: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    titleReview: {
        fontFamily: 'Archivo-Bold',
        fontSize: 20,
        color: '#303030'
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
    optionsBox: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        
        position: 'relative'
    },
    DateButtonsBox: {
        width: '30%',
    },
    labelDateButtons: {
        marginBottom: -2,
        fontFamily: 'Poppins-Bold',
        color: '#303030',
        fontSize: 12,
        
        alignSelf: 'center'
    },
    editButtonBox: {
        backgroundColor: '#60c3eb',
        flex: 1,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    containerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        marginTop: 2,
        color: '#FCFCFC',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 11
    },
    checkButtonBox: {
        backgroundColor: '#e74e36',
        flex: 1,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    featuresBox: {
        width: '100%',
        height: '50%',

        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        right: 0,
        bottom: 3
    },
    audioButton: {
    },
    noteButton: {
    },
    imageButton: {
    }
    
})

export default styles;