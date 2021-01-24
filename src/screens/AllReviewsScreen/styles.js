import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    flatlist: {
        flex: 1
    },
    filterBox: {
        width: '90%',
        flexDirection: 'row',

        marginBottom: 8,
        marginTop: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filterText: {
        fontFamily: 'Archivo-Bold',
        color: '#303030'
    },
    filterButton: {
        width: '30%',
        borderRadius: 7,
        flexDirection: 'row',
        backgroundColor: '#FFF',

        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 8,

        elevation: 2
    },
    filterOptionsButton: {
        width: 35,
        borderRadius: 7,
        flexDirection: 'row',
        backgroundColor: '#FFF',

        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 10,

        elevation: 2
    },
    filterModalTitleOptions: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 17,
    },
    filterModalOptionsBox: {
        flexDirection: 'row',
        width: '90%',

        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    filterModalSwitchItemBox: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center'
    },
    filterModalSwitchItemText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 14,
        color: '#303030',

        marginHorizontal: 5
    },
    filterModalInfoText: {
        fontFamily: 'Archivo-Medium',
        color: '#303030',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default styles;