import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    doubtItemBox: {
        width: '95%',
        height: 40,
        backgroundColor: '#FFF',
        elevation: 2,
        borderRadius: 10,
        
        paddingLeft: 5,
        marginVertical: 5,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'relative'
    },
    doubtItemText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#303030'
    },
    doubtItemButtonBox: {
        width: '10%',
        height: '100%',
        
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default styles