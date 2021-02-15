import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputWLabelL from '../../components/InputWLabelL';
import InputWLabelR from '../../components/InputWLabelR';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import styles from './styles';

const ChangePassScreen = () => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext)
    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()

    function handleCheckPass() {
        if (password != cPassword) {
            return alert('As senhas não conferem, verifique e tente novamente!')
        } else {
            api.post('/changePassword', {
                password: password
            }).then((response) => {
                alert('Senha redefinida com sucesso!')
                navigation.navigate('PreLoadScreen')
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 401') {
                    alert("Redefinição não autorizada, tente novamente!")
                } else if (err == 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao verificar sua senha, tente novamente.')
                }
            })
        }
    }

    return (
        <View style={styles.container}>
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
                marginTop={20}
            />
            <View style={styles.buttonBox}>
                <CustomButton text="REDEFINIR" color='#e74e36' onPress={handleCheckPass} />
            </View>
        </View>
    )
}

export default ChangePassScreen;
