import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputWLabelL from '../../components/InputWLabelL';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import styles from './styles';

const VerifyPassScreen = () => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext)
    const [password, setPassowrd] = useState()

    function handleCheckPass() {
        api.post('/verifyPassword', {
            password: password
        }).then((response) => {
            navigation.navigate("ChangePassScreen")
        }).catch((err) => {
            console.log(err)
            if (err == 'Error: Request failed with status code 401') {
                alert("Senha Incorreta! Verifique e tente novamente.")
            } else if (err == 'Error: Network Error') {
                alert("Sessão expirada!")
                logoutContext()
            } else {
                alert('Houve um erro ao verificar sua senha, tente novamente.')
            }
        })
    }

    return (
        <View style={styles.container}>
            <InputWLabelL
                labelTitle="Senha atual"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassowrd}
                placeholder="******"
                textAlign="center"
                lineColor="#60c3eb"
            />
            <View style={styles.buttonBox}>
                <CustomButton text="CONTINUAR" color='#60c3eb' onPress={handleCheckPass} />
            </View>
        </View>
    )
}

export default VerifyPassScreen;
