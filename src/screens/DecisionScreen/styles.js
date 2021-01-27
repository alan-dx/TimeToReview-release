import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        justifyContent: "flex-end"
    },
    topBox: {
        marginTop: 10,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleTop: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#303030'
    },
    logoBox: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    selectContainer: {
        alignItems: "center",
        justifyContent: 'space-evenly',
        width: '90%',
        height: 180,
        display: "flex",
    },
    devText: {
        color: '#606060',
        position: 'absolute',
        bottom: 5
    }
});

export default styles;