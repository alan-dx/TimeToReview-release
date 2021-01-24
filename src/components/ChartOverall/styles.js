import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 220,
        position: 'relative',
        
        alignItems: "center",
        justifyContent: 'center'
    },
    chartOverallCenter: {
        height: 50,
        
        position: 'absolute',
        alignItems: "center",
        justifyContent: 'center'
    },
    chartOverallText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 30,
        color: '#303030',
    },
    chartOverallSubText: {
        fontFamily: 'Archivo',
        fontSize: 12,
        color: '#606060'
    }
})

export default styles;