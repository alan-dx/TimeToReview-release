import React, { useContext, useEffect, useState }  from 'react'
import { View, Text } from 'react-native'
import AuthContext from '../../contexts/auth'
import styles from './styles'
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const VerifyAccountMailScreen = () => {

    const {user, logoutContext} = useContext(AuthContext)
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {
        console.log(user)
    }, [])

    const navigation = useNavigation()

    function handlePressSendButton() {
        setLoadingButton(true)

        api.get('/sendMailConfirm').then((response) => {
            setLoadingButton(false)
            console.log(response)
            navigation.navigate("VerifyAccountScreen")
        }).catch((err) => {
            setLoadingButton(false)
            console.log(err)

            if (err == 'Error: Network Error') {
                alert("Sessão expirada!")
                logoutContext()
            } else {
                alert('Houve um erro ao verificar sua conta, tente novamente mais tarde.')
            }
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.infoTextBox}>
                {
                    user.verifiedAccount
                    ?
                    <>
                        <Icon name="check-circle" size={60} color="#303030" />
                        <Text style={styles.infoText}>Você já verificou a sua conta!</Text>
                    </>
                    :
                    <>
                        <Text style={styles.infoText}>
                            Enviaremos uma mensagem para o seguinte email (informado na criação de sua conta):
                        </Text>
                        <Icon name="mail" size={35} color="#303030" />
                        <Text style={styles.mailText}>
                            {user.email}
                        </Text>
                        <Text style={styles.infoText}>
                            A mensagem contém um Token de confirmação, você deve copiar e colá-lo na tela seguinte.
                            {'\n'}
                            {'\n'}
                            Obs.: O email pode demorar alguns minutos para chegar até sua caixa de entrada. Além disso, verifique a caixa de Spam e demais campos para os quais
                            o seu provedor de email possa ter desviado a mensagem.
                        </Text>
                        {
                            loadingButton
                            ?
                                <CustomButton text="AGUARDE..." color='#e74e36' onPress={() => {}}/>
                            :   
                                <CustomButton text="ENVIAR EMAIL" color='#e74e36' onPress={handlePressSendButton}/>

                        }
                    </>
                }
            </View>
        </View>
    )
}

export default VerifyAccountMailScreen