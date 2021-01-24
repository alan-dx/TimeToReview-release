import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalCard: {
        height: 220,
        width: 350,
        
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: 'center',
        position: 'relative'
    },
    imageBox: {
        flex: 2,

       marginBottom: 10, 
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    controllerBox: {
        flex: 1,
        margin: 5,

        alignItems: 'center',

    },
    controllerOptionsBox: {
        width: '60%',
        flexDirection: 'row',
        
        justifyContent: 'space-around',
    },
    controllerButton: {
        marginHorizontal: 5,
        borderRadius: 50,
        padding: 5,

        alignItems: 'center',
        justifyContent: "center"
    },
    closeButton: {
        backgroundColor: '#FFF',
        borderRadius: 50,

        position: 'absolute',
        marginTop: 10,
        left: 5,
    },
    controllerTrackTitle: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#303030'
    }
})

export default styles;