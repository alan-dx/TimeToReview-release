import React, { useState } from 'react';
import { Modal, Image, View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import TrackPlayer from 'react-native-track-player';
import musicIcon from '../../assets/images/icons/music.png';

const PlayerModal = (props) => {

    const [handlePlayOrPause, setHandlePlayOrPause] = useState(true)

    async function handlePlayTrack() {
        await TrackPlayer.add(props.track).then(async () => {
            console.log(props.track)
            // let tracks = await TrackPlayer.getQueue()
            await TrackPlayer.play()
            .then(() => {
                setHandlePlayOrPause(false)
            })
            .catch((err) => {
                alert(`Houve um erro ao iniciar o player, tente novamente!`)
            })
        }).catch((err) => {
            alert('Houve um erro ao abrir o player, tente novamente!')
        })
    }

    async function handlePauseTrack() {
        await TrackPlayer.pause().then(() => {
            setHandlePlayOrPause(true)
        })
    }

    async function handleStopTrack() {
        await TrackPlayer.stop()
        await TrackPlayer.reset()
        props.handleCloseModal()
    }

    async function handleForwardTrack() {
        const TrackState = await TrackPlayer.getState()
        if (TrackState == 3) {
            TrackPlayer.seekTo(await TrackPlayer.getPosition() + 5)
        }
    }

    async function handleBackwardTrack() {
        const TrackState = await TrackPlayer.getState()
        if (TrackState == 3) {
            TrackPlayer.seekTo(await TrackPlayer.getPosition() - 5)
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
                    <View style={styles.imageBox}>
                        <Image 
                            source={musicIcon}
                            style={{width: 400, height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                        />
                    </View>
                    <View style={styles.controllerBox}>
                        <Text numberOfLines={1} style={styles.controllerTrackTitle}>{props.track.artist} - {props.track.title}</Text>
                        <View style={styles.controllerOptionsBox}>
                            <TouchableHighlight underlayColor="#DDDD" onPress={handleBackwardTrack} style={styles.controllerButton}>
                                <Icon  name="controller-fast-backward" size={30} color="#303030" />
                            </TouchableHighlight>
                            {
                                handlePlayOrPause 
                                ?
                                    <TouchableHighlight underlayColor="#DDDD" onPress={handlePlayTrack} style={styles.controllerButton}>
                                        <Icon  name="controller-play" size={30} color="#303030" />
                                    </TouchableHighlight>
                                :
                                    <TouchableHighlight underlayColor="#DDDD" onPress={handlePauseTrack} style={styles.controllerButton}>
                                        <Icon  name="controller-paus" size={30} color="#303030" />
                                    </TouchableHighlight>

                            }
                            <TouchableHighlight underlayColor="#DDDD" onPress={handleStopTrack} style={styles.controllerButton}>
                                <Icon  name="controller-stop" size={30} color="#303030" />
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#DDDD" onPress={handleForwardTrack} style={styles.controllerButton}>
                                <Icon  name="controller-fast-forward" size={30} color="#303030" />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <TouchableHighlight underlayColor="#DDDD" style={styles.closeButton} onPress={handleStopTrack}>
                        <Icon2 name="x" size={25} color="#303030" style={styles.iconBack} />
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

export default PlayerModal;