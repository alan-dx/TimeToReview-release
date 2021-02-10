import React, {useEffect, useState, useContext} from 'react'
import styles from './styles'
import {View, Image, Modal, TouchableHighlight, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import AuthContext from '../../contexts/auth'

const ImageModal = (props) => {

    const [selectedImage, setSelectedImage] = useState(0)
    const { premium } = useContext(AuthContext)

    useEffect(() => {
        console.log(props.image)
    }, [])

    function handleNextImage() {
        if (selectedImage < props.image.length - 1) {
            setSelectedImage(selectedImage + 1)
        }
    }

    function handleBackImage() {
        if (selectedImage > 0) {
            setSelectedImage(selectedImage - 1)
        }
    }

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
                    {
                        premium 
                        ?
                        <>
                            <Image source={{uri: `file:///${props.image[selectedImage]}`}} resizeMode="stretch" style={{width: 350, height: 310, borderRadius: 8}} />
                            {
                                selectedImage > 0
                                ?
                                    <TouchableHighlight onPress={handleBackImage} underlayColor="rgba(255,255,255,0.1)" style={styles.backImage}>
                                        <Icon name="chevron-left" size={40} color="rgba(0,0,0,0.7)" />
                                    </TouchableHighlight>
                                : null
                            }
                            {
                                (selectedImage < props.image.length - 1)
                                ?
                                    <TouchableHighlight  onPress={handleNextImage} underlayColor="rgba(285,255,255,0.1)" style={styles.nextImage}>
                                        <Icon name="chevron-right" size={40} color="rgba(0,0,0,0.7)" />
                                    </TouchableHighlight>
                                : null
                            }
                        </>
                        :
                        <Image source={{uri: `file:///${props.image}`}} resizeMode="stretch" style={{width: 350, height: 310, borderRadius: 8}} />
                    }
                </View>
            </View>
        </Modal>
    )
}

export default ImageModal;