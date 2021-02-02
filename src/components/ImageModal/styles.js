import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalCard: {
        minHeight: 350,
        width: 350,
        borderRadius: 10,
        backgroundColor: 'transparent',

        alignItems: "center",
        justifyContent: "flex-end",
        position: 'relative',
        zIndex: 0
    },
    closeButtonBox: {
        width: 35,
        height: 35,
        borderRadius: 8,
        backgroundColor: '#FFF',

        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        zIndex: 1,
        left: 0,
        top: 0
    },
    dontFoundImage: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#FCFCFC',

        zIndex: -1,
        position: 'absolute',
        bottom: '50%'
    },
    nextImage: {
        borderRadius: 50,

        position: 'absolute',
        right: 5,
        bottom: 135,
        alignItems: 'center',
        justifyContent: "center"
    },
    backImage: {
        borderRadius: 50,

        position: 'absolute',
        left: 5,
        bottom: 135,
        alignItems: 'center',
        justifyContent: "center"
    }
})

export default styles;