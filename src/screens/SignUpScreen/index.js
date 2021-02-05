import React, {useState, useEffect, useContext} from 'react';
import { Animated, View, Text, KeyboardAvoidingView, Keyboard, Alert, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import CheckBox from '@react-native-community/checkbox'
import CustomButton from '../../components/CustomButton';
import logoImage from '../../assets/images/icons/logo.png';
import AuthContext from '../../contexts/auth';
import styles from './styles';
import InputWLabelL from '../../components/InputWLabelL';
import InputWLabelR from '../../components/InputWLabelR';
import api from '../../services/api';

const LoginScreen = () => {

    const { signUpContext } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [checkBoxIsSelected, setCheckBoxIsSelected] = useState(false)
    const [logo] = useState(new Animated.ValueXY({x: 250, y: 250 }))
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {
        keyBoardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyBoardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        NetInfo.fetch().then(state => {
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                alert('Verifique sua conexão com a internet e tente novamente!')
                navigation.goBack()
            }
        })
    }, [])

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 160,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 160,
                duration: 100,
                useNativeDriver: false
            }),
            
        ]).start()
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 250,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 250,
                duration: 100,
                useNativeDriver: false
            }),
            
        ]).start()
    }

    function validationEmail(email) {
        //regex function
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(email);
    }

    const navigation = useNavigation();

    async function handleClickSignUpButton() {
        if (password != cPassword) {
            return alert("As senhas não conferem! Verifique e tente novamente.")
        }
        if (password && cPassword && name && email) {
            if (checkBoxIsSelected) {
                if (validationEmail(email)) {
                    // signUpContext({name, email, password})

                    try {
                        if (!loadingButton) {
                            setLoadingButton(true)
                            //REFACTOR LATER
                            await api.post('/signUp', {name, email, password}).then(response => {
                                alert('Usuário cadastrado com sucesso')
                                navigation.navigate("SignIn")
                            })
                            //REFACTOR LATER

                        }
                    } catch (error) {
                        setLoadingButton(false)
                        if (error == "Error: Request failed with status code 400") {
                            Alert.alert(
                                "Email já cadastrado!",
                                "Esse email já possui uma conta associada, verifique e tente novamente.",
                                [
                                  {
                                    text: "Ok",
                                    onPress: () => {},
                                    style: "cancel"
                                  },
                                ],
                                { cancelable: false }
                              )
                        } else if (error == "Error: Request failed with status code 500") {
                            alert("Houve um erro interno no servidor, tente novamente mais tarde!")
                        } else {
                            alert(error)
                        }
                    }

                } else {
                    Alert.alert(
                        "Email Inválido",
                        "Por favor insira um email válido.",
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
                    "Termos de Uso e Política de Privacidade!",
                    "Você precisa concordar com nossos Termos de Uso e Política de Privacidade para continuar.",
                    [
                      {
                        text: "Ok!",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
            }
        } else {
            alert("Você precisa preencher todos os campos antes de continuar!")
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.topBox}>
                <View style={styles.logoBox}>
                    <Animated.Image source={logoImage} style={{width: logo.x, height: logo.y}} />
                </View>
            </View>
        <View style={styles.selectBox}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.inputGroup}
                scrollEnabled={true}
                enableOnAndroid={true}              
            >
                <InputWLabelL
                    labelTitle="Seu Nome"
                    value={name}
                    secureTextEntry={false}
                    onChangeText={setName}
                    placeholder="Nome Sobrenome"
                    textAlign="center"
                />
                <InputWLabelR
                    labelTitle="Seu Email"
                    value={email}
                    secureTextEntry={false}
                    onChangeText={setEmail}
                    placeholder="email@example.com"
                    textAlign="center"
                    keyboardType="email-address"
                    marginTop={10}
                />
                <InputWLabelL
                    labelTitle="Crie uma Senha"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="******"
                    textAlign="center"
                    marginTop={10}
                />
                <InputWLabelR
                    labelTitle="Confirme a Senha"
                    value={cPassword}
                    secureTextEntry={true}

                    onChangeText={setCPassword}
                    placeholder="******"
                    textAlign="center"
                    marginTop={10}
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={checkBoxIsSelected}
                        onValueChange={setCheckBoxIsSelected}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Concordo com a
                        <Text onPress={() => Linking.openURL("https://timetoreview.herokuapp.com/privacyPolicy")} style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> política de privacidade e termos de uso</Text>
                    </Text>
                </View>
                <View style={styles.buttonBox}>
                {
                    loadingButton
                    ?
                        <CustomButton text="AGUARDE..." color='#60c3eb' onPress={() => {}}/>
                    :   
                        <CustomButton text="CADASTRAR" color='#60c3eb' onPress={handleClickSignUpButton} />
                }
                    
                </View>
            </KeyboardAwareScrollView>
        </View>
    </KeyboardAvoidingView>
    )
}

export default LoginScreen;