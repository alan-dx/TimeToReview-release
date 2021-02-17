import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';
import Iaphub from 'react-native-iaphub';
import { getUniqueId } from 'react-native-device-info';

const PreLoadScreen = () => {

    const { setSubjects, setUser, setRoutines, setAllReviews, loadServerData, setPerformance, logoutContext, setLastWeekPerformance, setPremium} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then(async (response) => {
            
            // const reminderTime = new Date(response.data.reminderTime)
            // console.log('sub',response.data.reviews)
            //app general config
            setUser({
                name: response.data.name,
                email: response.data.email,
                reminderTime: response.data.reminderTime,
                verifiedAccount: response.data.verifiedAccount
            })
            setSubjects(response.data.subjects)
            setRoutines(response.data.routines)
            // setReviews(response.data.filterReviews)
            setAllReviews(response.data.reviews)

            response.data.performance.forEach(item => {
                item.cycles.forEach(sub => {
                    sub.chronometer = new Date(sub.chronometer)
                })
            })

            response.data.lastWeekPerformance.forEach(item => {
                item.cycles.forEach(sub => {
                    sub.chronometer = new Date(sub.chronometer)
                })
            })

            setLastWeekPerformance(response.data.lastWeekPerformance)
            setPerformance(response.data.performance)
            //app general config

            // iap setup
            await Iaphub.init({
                // The app id is available on the settings page of your app
                appId: "",
                // The (client) api key is available on the settings page of your app
                apiKey: "",
                // App environment (production by default, other environments must be created on the IAPHUB dashboard)
                environment: "production"
            });

            await Iaphub.setUserId(getUniqueId());
            
            var products = await Iaphub.getActiveProducts();

            // alert(products[0].title)

            if (products[0]) {
                // alert(products[0].sku)
                setPremium(true)
            }

            //iap setup

            navigation.reset({
                index: 0,
                routes: [{name: "HomeScreen"}]
            })

        }).catch((err) => {
            alert(err)
            ToastAndroid.show("Sessão expirada!", 2000)
            logoutContext()
        })
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCFCFC'}}>
            <ActivityIndicator size="large" color="#303030" />
            <Text style={{marginTop: 15, fontFamily: 'Archivo-SemiBold', textAlign: 'center'}}>Carregando dados... Caso este processo esteja demorando muito, verifique a sua conexão!</Text>
        </View>
    )
    
}

export default PreLoadScreen;