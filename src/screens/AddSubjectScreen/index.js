import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import InputWLabelL from '../../components/InputWLabelL';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest("ca-app-pub-9301871566936075/9911463089", {//it is necessary to put this here 
    requestNonPersonalizedAdsOnly: true
});

const AddSubjectScreen = (props) => {

    const navigation = useNavigation()

    const { logoutContext } = useContext(AuthContext)
    const [titleSubject, setTitleSubject] = useState('')
    const [markerSubject, setMarkerSubject] = useState('')
    const [loadedAd, setLoadedAd] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)

    //InterstialAd Setup
    useEffect(() => {
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                console.log('carregou')
                setLoadedAd(true);
            }
            });
        
            // Start loading the interstitial straight away
            interstitial.load();
        
            // Unsubscribe from events on unmount
            return () => {
            eventListener();
            };
    }, [])
    //InterstialAd Setup

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {

        if (!titleSubject || !markerSubject) {
            alert("Preencha todos os campos abaixo")
        } else {
            if (!loadingButton) {
                setLoadingButton(true)

                api.post("/createSubject", {
                    title: titleSubject,
                    marker: markerSubject
                }).then((response) => {
    
                    if (loadedAd) {
                        interstitial.show()
                    }
    
                    props.route.params.onGoBack(response.data)
                    navigation.goBack()
                }).catch((err) => {
                    setLoadingButton(false)

                    console.log(err)
                    if (err == 'Error: Request failed with status code 500') {
                        alert("Erro interno do servidor, tente novamente mais tarde!.")
                    } else if (err = 'Error: Network Error') {
                        alert("Sessão expirada!")
                        logoutContext()
                    } else {
                        alert('Houve um erro ao tentar salvar sua disciplina no banco de dados, tente novamente!')
                    }
                })

            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    {   
                        loadingButton 
                        ?
                        <ActivityIndicator size="small" color="#F7F7F7" style={styles.iconBack} />
                        :
                        <BorderlessButton onPress={handleConfirmAdd}>
                            <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                        </BorderlessButton>
                    }
                </View>
                <Text style={styles.headerText}>CRIAR DISCIPLINA</Text>
            </View>
            <View style={styles.main}>
                <InputWLabelL
                    labelTitle="Título da Disciplina"
                    value={titleSubject}
                    secureTextEntry={false}
                    onChangeText={setTitleSubject}
                    placeholder="Ex.: Cálculo III"
                    textAlign="center"
                />
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Cor do Marcador</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <ColorPicker markerSubject={markerSubject} setMarkerSubject={setMarkerSubject} />
                </View>
            </View>
        </View>
    )
}

export default AddSubjectScreen;