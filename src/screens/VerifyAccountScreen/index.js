import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputWLabelL from '../../components/InputWLabelL';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import styles from './styles';

const VerifyAccountScreen = () => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext)
    const [token, setToken] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false)

    function handleVerifyAccount() {

        if (token) {
            setLoadingButton(true)
            
            api.post('/mailConfirm', {
                token: token
            }).then((response) => {
                setLoadingButton(false)
                navigation.navigate('PreLoadScreen')
            }).catch((err) => {
                setLoadingButton(false)
                console.log(err)
                if (err == 'Error: Request failed with status code 401') {
                    Alert.alert(
                        "Token expirado!",
                        "O token que você informou expirou. Realize o processo de verificação da conta para receber um novo token",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "Confirmar", onPress: () => {
                            navigation.navigate('SettingScreen')
                          }}
                        ],
                        { cancelable: false }
                      );
                } else if (err == 'Error: Request failed with status code 409') {
                    Alert.alert(
                        "Token Inválido!",
                        "O token que você informou está inválido. Verifique se você copiou o token corretamente e se ele está completo.",
                        [
                          {
                            text: "Ok",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          }
                        ],
                        { cancelable: false }
                    );
                } else if (err == 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao verificar sua conta, verifique o token informado ou tente mais tarde.')
                }
            })

        } else {
            alert('Preencha o campo indicado!')
        }
    }

    return (
        <View style={styles.container}>
            <InputWLabelL
                labelTitle="Insira o Token de confirmação"
                value={token}
                onChangeText={setToken}
                placeholder="a1fjqq109s23axswoip1*"
                textAlign="center"
                lineColor="#60c3eb"
            />
            <View style={styles.buttonBox}>
                {
                    loadingButton
                    ?
                        <CustomButton text="AGUARDE..." color='#60c3eb' onPress={() => {}}/>
                    :   
                        <CustomButton text="CONFIRMAR" color='#60c3eb' onPress={handleVerifyAccount}/>

                }
            </View>
        </View>
    )
}

export default VerifyAccountScreen;
