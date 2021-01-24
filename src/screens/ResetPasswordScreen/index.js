import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import {View, Alert} from 'react-native'
import CustomButton from '../../components/CustomButton'
import InputWLabelL from '../../components/InputWLabelL'
import InputWLabelR from '../../components/InputWLabelR'
import api from '../../services/api'
import styles from './styles'

const ResetPasswordScreen = (props) => {

    const navigation = useNavigation()

    const [email] = useState(props.route.params.email)
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    function handleResetPassword() {

        if (token != '' && password != '' && cPassword != '' ) {
            if (cPassword == password) {

                api.post('/resetPassword', {
                    email: email,
                    token: token,
                    password: password
                })
                .then((res) => {

                    navigation.reset({
                        index: 0,
                        routes: [{name: "SignIn"}]
                    })

                    Alert.alert(
                        "Senha redefinida!",
                        "Sua senha foi modificada com sucesso.",
                        [
                          {
                            text: "Ok",
                            onPress: () => {},
                            style: "cancel"
                          },
                        ],
                        { cancelable: false }
                    )
                    
                }).catch((err) => {
                    if (err == 'Error: Request failed with status code 401' || 'Error: Request failed with status code 409') {
                        Alert.alert(
                            "Token Inválido!",
                            "Verifique o token informado e tente novamente. Lembre-se que cada Token possui validade de apenas uma hora.",
                            [
                              {
                                text: "Ok",
                                onPress: () => {

                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: "ForgotPassword"}]
                                    })

                                },
                                style: "cancel"
                              },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        Alert.alert(
                            "Ops... Algo de errado aconteceu!",
                            "Houve um erro durante a tentativa de redefinir sua senha, tente novamente.",
                            [
                              {
                                text: "Ok",
                                onPress: () => {

                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: "ForgotPassword"}]
                                    })

                                },
                                style: "cancel"
                              },
                            ],
                            { cancelable: false }
                        )
                    }
                })
            } else {
                Alert.alert(
                    "Ops... Confira os dados",
                    "As senhas informadas não conferem!",
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
        } else {
            Alert.alert(
                "Ops...",
                "Preencha todos campos solicitados!",
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
                labelTitle="Token de Redefinição"
                value={token}
                secureTextEntry={false}
                onChangeText={setToken}
                placeholder="a3iu8o2oiu11kj3a12jda"
                textAlign="center"
                lineColor="#e74e36"
            />
            <InputWLabelR
                labelTitle="Nova Senha"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholder="******"
                textAlign="center"
                lineColor="#e74e36"
            />
            <InputWLabelL 
                labelTitle="Confirme a Nova Senha"
                value={cPassword}
                secureTextEntry={true}
                onChangeText={setCPassword}
                placeholder="******"
                textAlign="center"
                lineColor="#e74e36"
            />
            <View style={{width: '100%', alignItems: 'center', marginTop: 25}}>
                <CustomButton text="CONFIRMAR" color='#e74e36' onPress={handleResetPassword}/>
            </View>
        </View>
    )
}

export default ResetPasswordScreen