import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    optionsBox: {
        paddingVertical: 8,

        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    inputBox: {
        flex: 1,
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '90%',
        flex: 1,
        borderRadius: 15,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#303030',

        alignSelf: "center",
        paddingVertical: 20,
        paddingHorizontal: 15
    }
})

export default styles