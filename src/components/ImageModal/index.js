import React, {useEffect} from 'react'
import styles from './styles'
import {View, Image, Modal, TouchableHighlight, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const ImageModal = (props) => {

    useEffect(() => {
        console.log(props.image)
    }, [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View style={styles.closeButtonBox}>
                        <TouchableHighlight underlayColor="#DDDD" onPress={props.handleCloseModal}>
                            <Icon name="x" size={25} color="#303030" />
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.dontFoundImage}>Imagem não econtrada! Verifique se ela ainda está presente em seu dispositivo.</Text>
                    <Image source={{uri: `file:///${props.image}`}} resizeMode="stretch" style={{width: 350, height: 310, borderRadius: 8}} />
                </View>
            </View>
        </Modal>
    )
}

export default ImageModal;