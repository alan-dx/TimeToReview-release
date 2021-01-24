import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        height: '25%',
        maxHeight: 250,
        width: '100%',
        backgroundColor: '#60c3eb',

        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
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
    createdAtText: {
        fontFamily: 'Archivo-Bold',
        color: '#FFF',
        fontSize: 13,

        position: 'absolute',
        bottom: 5,
        left: 5
    },
    main: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FCFCFC',

        justifyContent: "space-evenly",
    },
    dntReviewBox: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    dntReview: {
        alignItems: 'center'
    },
    labelIconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        alignItems: 'center',
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'flex-start',
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
        backgroundColor: '#e74e36',
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        marginHorizontal: 3
    },
    label2: {
        fontFamily: 'Archivo-Bold',
        fontSize: 13,
        marginHorizontal: 3
    },
    subLabel: {
        marginTop: 2,
        color: '#ABABAB',
        fontSize: 12,
        fontFamily: 'Archivo-SemiBold'
    },
    labelTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        marginBottom: 4
    },
    labelBottom: {
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        color: '#ABABAB'
    },
    featuresBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    separator: {
        height: 60,
        width: 1,
        backgroundColor: '#e74e36',
    },
    featuresButton: {
        alignItems: 'center',
    }
})

export default styles;