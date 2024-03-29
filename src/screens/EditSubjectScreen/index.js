import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton, TextInput } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import InputWLabelL from '../../components/InputWLabelL';

const EditSubjectScreen = (props) => {

    const screenData = props.route.params.screenData

    const navigation = useNavigation()

    const {logoutContext} = useContext(AuthContext)

    const [titleSubject, setTitleSubject] = useState(screenData.label)
    const [markerSubject, setMarkerSubject] = useState(screenData.marker)
    const [loadingButton, setLoadingButton] = useState(false)

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {

        if (!titleSubject || !markerSubject) {
            alert("Preencha todos os campos abaixo")
        } else {
            if ((titleSubject != screenData.label) || (markerSubject != screenData.marker)) {
                if (!loadingButton) {
                    setLoadingButton(true)

                    api.put("/editSubject", {
                        title: titleSubject,
                        marker: markerSubject
                    },{
                        params: {
                            id: screenData._id
                        }
                    }).then((response) => {
                        navigation.goBack()
                        props.route.params.onGoBack(response.data.subject)
                    }).catch((err) => {
                        setLoadingButton(false)

                        console.log(err)
                        if (err == 'Error: Request failed with status code 500') {
                            alert("Erro interno do servidor, tente novamente mais tarde!.")
                        } else if (err = 'Error: Network Error') {
                            alert("Sessão expirada!")
                            logoutContext()
                        } else {
                            alert('Houve um erro ao tentar salvar sua matéria no banco de dados, tente novamente!')
                        }
                    })

                }
            } else {
                navigation.goBack()
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
                <Text style={styles.headerText}>EDITAR DISCIPLINA</Text>
            </View>
            <View style={styles.main}>
                <InputWLabelL
                    labelTitle="Título da Disciplina"
                    value={titleSubject}
                    secureTextEntry={false}
                    onChangeText={setTitleSubject}
                    placeholder="Ex.: Cálculo III"
                    textAlign="center"
                    lineColor="#e74e36"
                    autoCapitalize="words"
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

export default EditSubjectScreen;