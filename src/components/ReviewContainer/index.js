import React, { useEffect, useState } from 'react';
import { View, Text, ToastAndroid} from 'react-native';
import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReviewContainer = (props) => {

    const [sequence, setSequence] = useState('')
    const [delayed, setDelayed] = useState(false)
    
    useEffect(() => {
        setSequence(props.data.routine_id.sequence.join('-'))
        let currentDate = new Date()
        currentDate.setUTCHours(0,0,0,0)
        let reviewDate = new Date(props.data.dateNextSequenceReview)
        reviewDate.setUTCHours(0,0,0,0)

        console.log(props.data.dateNextSequenceReview)
        console.log(reviewDate, currentDate)
        if (reviewDate < currentDate) {
            setDelayed(true)
        }

    }, [])

    return (

        <View style={styles.container}>
            <View style={[styles.subjectColorMarker, {backgroundColor: props.data.subject_id.marker}]} />
            <View style={styles.infoBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleReview} numberOfLines={1}>{props.data.title}</Text>
                </View>
                {
                    (delayed && props.haveDelay) && <Icon name="date-range" size={22} color="red" style={styles.alertIcon} />
                }
            </View>
            <View style={styles.optionsBox}>
                <View style={styles.DateButtonsBox}>
                    <Text style={styles.labelDateButtons}> </Text>
                    <View style={styles.editButtonBox}>
                        <RectButton onPress={props.onPressEdit} style={styles.containerButton}>
                            <Text style={styles.textButton}>EDITAR</Text>
                        </RectButton>
                    </View>
                </View>
                <View style={styles.DateButtonsBox}>
                    <Text numberOfLines={1} style={styles.labelDateButtons}>{sequence}</Text>
                    <View style={styles.checkButtonBox}>
                        <RectButton onPress={props.onPressConclude} style={styles.containerButton}>
                            <Text style={styles.textButton}>{props.titleRightButton}</Text>
                        </RectButton>
                    </View>
                </View>
                <View style={styles.featuresBox}>
                    {
                        props.data.track && props.haveExtraOptions ? 
                            <BorderlessButton style={styles.audioButton} onPress={props.onPressAudioButton}>
                                <Icon name="library-music" size={22} color="#303030" />
                            </BorderlessButton>
                        :
                            <BorderlessButton style={styles.audioButton} onPress={() => {
                                if (props.haveExtraOptions) {
                                    ToastAndroid.show('Não há áudio associado!', 300)
                                }
                            }}>
                                <Icon name="library-music" size={22} color="#F0F0F0" />
                            </BorderlessButton>
                    }
                    {
                        props.data.image && props.haveExtraOptions ?
                            <BorderlessButton style={styles.imageButton} onPress={props.onPressImageButton}>
                                <Icon name="collections" size={22} color="#303030" />
                            </BorderlessButton>
                        :
                            <BorderlessButton style={styles.imageButton} onPress={() => {
                                if (props.haveExtraOptions) {
                                    ToastAndroid.show('Não há imagem associada!', 300)
                                }
                            }}>
                                <Icon name="collections" size={22} color="#F0F0F0" />
                            </BorderlessButton>
                    }
                    { 
                        props.data.notes.title != '' && props.haveExtraOptions  ? 
                            <BorderlessButton style={styles.noteButton} onPress={props.onPressNotesButton}>
                                <Icon name="library-books" size={22} color="#303030" />
                            </BorderlessButton>
                        :
                            <BorderlessButton style={styles.noteButton} onPress={() => {
                                if (props.haveExtraOptions) {
                                    ToastAndroid.show('Não há nota associada!', 300)
                                }
                            }}>
                                <Icon name="library-books" size={22} color="#F0F0F0" />
                            </BorderlessButton>
                    }
                </View>
            </View>
        </View>
    )
}

export default ReviewContainer;