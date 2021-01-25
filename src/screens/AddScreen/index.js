import React, { useState, useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Alert, BackHandler } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { BorderlessButton } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import PickerInfo from '../../components/Picker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import DocumentPicker from 'react-native-document-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import InputWLabelL from '../../components/InputWLabelL';

const AddScreen = (props) => {

    const {routines, subjects, setAllReviews, allReviews, user, logoutContext} = useContext(AuthContext)

    const [titleReview, setTitleReview] = useState('')
    const [trackAudioReview, setTrackAudioReview] = useState(null)
    const [subjectReview, setSubjectReview] = useState('')
    const [routineReview, setRoutineReview] = useState('')
    const [dateNextSequenceReview, setDateNextSequenceReview] = useState('');
    const [ notesReview, setNotesReview ] = useState({
        title: '',
        note: '',
        align: 'left'
    })
    const [imageReview, setImageReview] = useState(null)
    
    const navigation = useNavigation();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {//to disable end review cycle on press hardware back button
            console.log('asda')

            props.route.params.onGoBack(null)
            navigation.goBack()
            return true
        })
    }, [])

    function handlePressGoBack() {
        props.route.params.onGoBack(null)
        navigation.goBack()
        setTrackAudioReview('')
    }

    async function handleAudioSelector() {
        
        try {
            
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            
            let id;
            let url;
            //callback interface
            await UUIDGenerator.getRandomUUID().then((uuid) => {
                id = uuid
            })
            
            await RNFetchBlob.fs
            .stat(res.uri)
            .then((stats) => {
                console.log(stats.path)
                url = `file://${stats.path}`
            })
            .catch((err) => {
                Alert.alert(
                    "Ops, algo de errado aconteceu, mas vamos tentar de novo!",
                    "Não foi possível selecionar o arquivo desejado, mas você pode contornar esse problema"+
                    " navegando entre as pastas do seu smartphone, procurando e selecionando o arquivo quando pressionar a opção novamente.\n\n"+
                    "Esse erro costuma ocorrer em alguns dispositivos ao tentar selecionar um arquivo na aba RECENTES (a primeira tela exibida) do navegador de arquivos. \n\n"+
                    "OBS.: Não se esqueça de ativar a opção 'Visualizar armazenamento interno' nas opções no canto superior direito do navegador de arquivos.",
                    [
                        {
                            text: "Ok, vou tentar de novo.",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                    );
                });
                
                let track = {
                    id: id,
                    url: url,
                    type: 'default',
                    title: titleReview,
                    artist: user.name,
                    album: 'TTR - audios',
                    artwork: 'https://picsum.photos/100',
                }
                
                //ASSOCIAR AUDIO DIRETO DO GOOGLE DRIVE

                setTrackAudioReview(track)
                
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    // User cancelled the picker, exit any dialogs or menus and move on
                    console.log('cancelou')
                } else {
                    console.log(err)
                alert('Houve um erro ao selecionar o arquivo, tente novamente!')
            }
        }
    }
    
    function handleSaveNotes(note) {
        setNotesReview(note)
    }
    
    function handleGoToNotesScreen() {
        navigation.navigate("NotesScreen", {
            onGoBack: handleSaveNotes,
            screenData: notesReview
        })
    }
    
    async function handleImageSelector() {

        try {
            
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            
            let url;
            
            await RNFetchBlob.fs
            .stat(res.uri)
            .then((stats) => {
                console.log(stats.path)
                url = `${stats.path}`
            })
            .catch((err) => {
                Alert.alert(
                    "Ops, algo de errado aconteceu, mas vamos tentar de novo!",
                    "Não foi possível selecionar o arquivo desejado, mas você pode contornar esse problema"+
                    " navegando entre as pastas do seu smartphone, procurando e selecionando o arquivo quando pressionar a opção novamente.\n\n"+
                    "Esse erro costuma ocorrer em alguns dispositivos ao tentar selecionar um arquivo na aba RECENTES (a primeira tela exibida) do navegador de arquivos. \n\n"+
                    "OBS.: Não se esqueça de ativar a opção 'Visualizar armazenamento interno' nas opções no canto superior direito do navegador de arquivos.",
                    [
                        {
                            text: "Ok, vou tentar de novo.",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                    );
                });
                
                //ASSOCIAR AUDIO DIRETO DO GOOGLE DRIVE

                setImageReview(url)
                
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    // User cancelled the picker, exit any dialogs or menus and move on
                    console.log('cancelou')
                } else {
                    console.log(err)
                alert('Houve um erro ao selecionar o arquivo, tente novamente!')
            }
        }
    }

    function handleCreateReview() {
        const currentDate = new Date()
        currentDate.setUTCHours(5,0,0,0)

        if (!titleReview || !subjectReview || !routineReview) {
            alert("Preencha todos os campos!")
        } else {
            api.post('/createReview', {
                title: titleReview,
                routine_id: routineReview._id,
                subject_id: subjectReview._id,
                dateNextSequenceReview: dateNextSequenceReview,
                track: trackAudioReview,
                notes: notesReview,
                image: imageReview,
                date: currentDate
            }).then((response) => {

                navigation.goBack()
                setAllReviews([...allReviews, response.data])
                console.log(response.data)
                subjects.forEach(item => {
                    if (item._id == subjectReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                routines.forEach(item => {
                    if (item._id == routineReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                if (dateNextSequenceReview.getDate() == currentDate.getDate()) {
                    props.route.params.onGoBack(response.data)
                }

            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!.")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua revisão no banco de dados, tente novamente!')
                }
            })
        }

    }
    
    //ADICIONAR A DATA DE QUANDO FOI CRIADA
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handleCreateReview}>
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>ADICIONAR REVISÃO</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.dntReview}>
                    <View style={styles.labelIconBox}>
                        <Icon name="calendar" size={20} color="#303030" style={{marginRight: 3}} />
                        <Text style={styles.label2}>Data da primeira Revisão</Text>
                    </View>
                    <Text style={styles.subLabel}>{
                        dateNextSequenceReview == "" ? "GERADA AUTOMATICAMENTE AO SELECIONAR UMA SEQUÊNCIA" 
                        :`${dateNextSequenceReview.getDate() < 10 ? `0${dateNextSequenceReview.getDate()}` : dateNextSequenceReview.getDate()
                        }/${dateNextSequenceReview.getMonth() < 10 ? `0${dateNextSequenceReview.getMonth()+1}` : dateNextSequenceReview.getMonth()+1
                        }/${dateNextSequenceReview.getFullYear()}`
                        }</Text>
                </View>
                <InputWLabelL 
                    labelTitle="Título da Revisão"
                    value={titleReview}
                    secureTextEntry={false}
                    onChangeText={setTitleReview}
                    placeholder="Ex.: EDO de Bernoulli"
                    textAlign="center"
                />
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Disciplina da Revisão</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={subjects}
                        onChangeItem={setSubjectReview}
                    />
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Sequência da Revisão</Text>
                    </View>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={routines}
                        onChangeItem={(item) => {
                            const currentDate = new Date()
                            setRoutineReview(item)
                            const nextDate = currentDate.getDate() + Number(item.sequence[0])
                            const dateNextSequenceReviewSend = new Date(currentDate.getFullYear(), currentDate.getMonth(), nextDate, 3)
                            dateNextSequenceReviewSend.setUTCHours(5,0,0,0)
                            setDateNextSequenceReview(dateNextSequenceReviewSend)
                        }}
                    />
                </View>
                <View style={styles.featuresBox}>
                    <View style={styles.featuresButton}>
                        <Text style={styles.label2}>Anotações</Text>
                        <BorderlessButton style={{marginTop: 5}} onPress={handleGoToNotesScreen}>
                            <Icon3 name="library-books" size={28} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                    <View style={styles.featuresButton}>
                        <Text style={styles.label2}>Imagem</Text>
                        <BorderlessButton style={{marginTop: 5}} onPress={handleImageSelector}>
                            <Icon3 name="collections" size={28} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                    <View style={styles.featuresButton}>
                        <Text style={styles.label2}>Áudio</Text>
                        <BorderlessButton style={{marginTop: 5}} onPress={handleAudioSelector}>
                            <Icon3 name="library-music" size={28} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                </View> 
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddScreen;