import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import {View, Text, Alert} from 'react-native'
import CustomButton from '../../components/CustomButton'
import InputWLabelL from '../../components/InputWLabelL'
import api from '../../services/api'
import styles from './styles'

const ForgotPasswordScreen = () => {

    const navigation = useNavigation()
    
    const [recoveryEmail, setRecoveryEmail] = useState('')

    function handleVerifyEmail() {

        if (recoveryEmail != '') {
            api.post('/forgotPassword', {
                email: recoveryEmail
            }).then((res) => {
                navigation.navigate('ResetPassword', {
                    email: recoveryEmail,
                })
            }).catch((err) => {
                console.log(err)
                if (err = 'Error: Request failed with status code 404') {
                    Alert.alert(
                        "Ops... Verifique os dados",
                        "Não há usuário cadastrado neste email, verifique se o email esta correto e tente novamente!",
                        [
                          {
                            text: "Ok",
                            onPress: () => {},
                            style: "cancel"
                          },
                        ],
                        { cancelable: false }
                      )
                } else {
                    Alert.alert(
                        "Ops... Algo de errado ocorreu!",
                        "Houve um erro desconhecido, tente novamente!",
                        [
                          {
                            text: "Ok",
                            onPress: () => {},
                            style: "cancel"
                          },
                        ],
                        { cancelable: false }
                      )
                }
            })

        } else {
            Alert.alert(
                "Ops...",
                "Preencha o campo solicitado!",
                [
                  {
                    text: "Ok",
                    onPress: () => {},
                    style: "cancel"
                  },
                ],
                { cancelable: false }
            )
        }
    }

    return (
        <View style={styles.container}>
            <InputWLabelL 
                labelTitle="Email de Recuperação"
                value={recoveryEmail}
                secureTextEntry={false}
                onChangeText={setRecoveryEmail}
                placeholder="email@example.com"
                textAlign="center"
                keyboardType="email-address"
            />
            <View style={styles.helpTextBox}>
                <Text style={styles.helpText}>
                    Informe o email associado a sua conta, enviaremos uma mensagem com os passos para redefinir sua senha.
                </Text>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton text="CONTINUAR" color='#60c3eb' onPress={handleVerifyEmail}/>
            </View>
        </View>
    )
}

export default ForgotPasswordScreen