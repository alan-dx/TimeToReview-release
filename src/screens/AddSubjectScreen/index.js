import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import InputWLabelL from '../../components/InputWLabelL';

const AddSubjectScreen = (props) => {

    const navigation = useNavigation()

    const { logoutContext } = useContext(AuthContext)
    const [titleSubject, setTitleSubject] = useState('')
    const [markerSubject, setMarkerSubject] = useState('')

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {

        if (!titleSubject || !markerSubject) {
            alert("Preencha todos os campos abaixo")
        } else {
            api.post("/createSubject", {
                title: titleSubject,
                marker: markerSubject
            }).then((response) => {
                props.route.params.onGoBack(response.data)
                navigation.goBack()
            }).catch((err) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handleConfirmAdd} >
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>CRIAR DISCIPLINA</Text>
            </View>
            <View style={styles.main}>
                <InputWLabelL
                    labelTitle="Título da Revisão"
                    value={titleSubject}
                    secureTextEntry={false}
                    onChangeText={setTitleSubject}
                    placeholder="Ex.: EDO de Bernoulli"
                    textAlign="center"
                />
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Cor da marcação</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <ColorPicker markerSubject={markerSubject} setMarkerSubject={setMarkerSubject} />
                </View>
            </View>
        </View>
    )
}

export default AddSubjectScreen;