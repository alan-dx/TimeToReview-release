import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    
    const [routines, setRoutines] = useState([])
    const [subjects, setSubjects] = useState(null)
    const [reviews, setReviews] = useState([])
    const [allReviews, setAllReviews] = useState([])
    const [performance, setPerformance] = useState([])
    const [lastWeekPerformance, setLastWeekPerformance] = useState([])
    const [premium, setPremium] = useState(true)

    async function loadServerData() {
        const currentDate = new Date()
        //to get the exact time system
        currentDate.setUTCHours(currentDate.getTimezoneOffset()/60,currentDate.getMinutes())
        console.log('---->', currentDate, currentDate.getUTCDay())

        return await api.post('/listUser', {
            date: currentDate
        })
    }

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await AsyncStorage.getItem("@TTR:token")
            // const storageUser = await AsyncStorage.getItem("@TTR:user")

            if (storageToken) {
                // setUser(JSON.parse(storageUser))
                setToken(storageToken)
                api.defaults.headers["Authorization"] = `Bearer ${storageToken}`
                await api.get('/verifyToken').catch((err) => {
                    logoutContext() //logout user when the token is invalid
                })
            }
        }
        loadStorageData()
    }, [])

    //REMOVE LATER
    async function signInContext(data) {
        try {

            const response = await api.post('/signIn', data)
            if (response.data) {
                const { token } = response.data;
                api.defaults.headers["Authorization"] = `Bearer ${token}`
               await AsyncStorage.setItem("@TTR:token", token)
                // AsyncStorage.setItem("@TTR:user", JSON.stringify(user))
                setToken(token)
                // setUser(user)
            }
        } catch (error) {
            console.log(error)
            if (error == 'Error: Request failed with status code 401') {
                alert(`Senha/Email Incorretos. Verifique e tente novamente!`)
            } else if ( error == 'Error: Request failed with status code 404') {
                Alert.alert(
                    "Usuário não encontrado!",
                    "Não há conta associada a esse endereço de email, verifique e tente novamente",
                    [
                      {
                        text: "Ok!",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
            } else if ( error == 'Error: Request failed with status code 406') {
                Alert.alert(
                    "Conta desativada!",
                    "Esta conta foi desativada, entre em contato com nossa equipe.",
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

        }
    }
    //REMOVE LATER

    //REMOVE LATER
    async function signUpContext(data) {
        try {
            return await api.post('/signUp', data).then(response => {
                console.log(response.data)                    
                alert('Usuário cadastrado com sucesso')
            })
        } catch (error) {
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
    }
    //REMOVE LATER

    async function logoutContext() {
        try {
            await AsyncStorage.removeItem("@TTR:token")
            setToken(null)
        } catch (err) {
            alert(err)
        }
    };

    async function loadUserReviews(user_id) {
        try {
            const response = await api.get('/indexReviews', {
                params: {
                    user_id: user_id
                }
            })

            return response.data

        } catch (err) {
            alert(err)
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: token, user: user, setUser, signInContext, signUpContext, premium,
            setPremium,logoutContext, loadUserReviews, routines, setRoutines, subjects, setToken,
            setSubjects, reviews, setReviews, loadServerData, allReviews, setAllReviews, 
            performance, setPerformance, lastWeekPerformance, setLastWeekPerformance}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;