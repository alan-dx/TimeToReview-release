import React, {useContext, useEffect, useState} from 'react';
import { View, Modal, Text, Alert } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import SubjectContainer from '../../components/SubjectContainer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import ScreenTutorial from '../../components/ScreenTutorial';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';

const SubjectScreen = (props) => {

    const { subjects, setSubjects, allReviews } = useContext(AuthContext)
    const [data, setData] = useState(subjects)
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Icon name="book" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Esta é a tela de Disciplinas!
            {"\n"}
            {"\n"}
            Aqui é onde você terá acesso a todos as disciplinas que criar.
        </Text>
    </View>
    
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Esse é o botão que você ira utilizar quando desejar criar uma nova disciplina!
        </Text>
    </View>
    
    let Step2 = <View style={stylesSteps.container}>
        <SubjectContainer 
            onPressEdit={() => {}} 
            onPressDelete={() => {}}
            data={{"associatedReviews": ["1", "2", "3"],  "label": "Disciplina X", "marker": "#ff9900", "value": "Cálculo B"}}
        />
        <Text style={stylesSteps.desciptionText}>
            Container de Disciplina.
            {"\n"}
            {"\n"}
            É dessa forma que as suas disciplinas de estudo irão aparecer, cada container possui o nome, a quantidade de revisões
            associadas e um marcador colorido {"(selecionado durante a criação da disciplina)"}.
        </Text>
    </View>
    
    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeSubjectScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeSubjectScreen', 'true')
            }
            console.log(subjects)
        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    const navigation = useNavigation()

    function handlePressGoToAddSubjectScreen() {
        if (subjects.length < 8) {
            navigation.navigate("AddSubjectScreen", {
                onGoBack: handleUpdateDataOnAdd
            })
        } else {
            Alert.alert(
                "Ops...",
                "Você só pode criar até oito disciplinas na versão gratuita do TimeToReview. Caso deseje criar disciplinas ilimitadamente, adquira a versão Premium.",
                [
                  {
                    text: "Ok",
                    onPress: () => {},
                    style: "cancel"
                  },
                ],
                { cancelable: false }
              );
        }
    }

    function handleUpdateDataOnAdd(passData) {
        setData([...data, passData.subject])
        setSubjects([...subjects, passData.subject])
    }

    function handlePressGoToEditScreen(screenData) {
        navigation.navigate("EditSubjectScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {

        //map is working here, wtf?
        allReviews.map(item => {//VERIFICAR A POSSIBILIDADE DE USAR PARA ATUALIZAR A FLATLIST OU A SUBJECTS NO CONTEXTO
            //PARA ATUALIZAR A MATÉRIA DENTRO DA REVISÃO A QUAL ESSA ESTA ASSOCIADA, SEM PRECISAR FAZER UMA REQUISIÇÃO
            if (item.subject_id._id == passData._id) {
                item.subject_id = passData
            }
        })
  
        const newData = data
        setData([])//For some reason, it is necessary to do this to update the list, perhaps because I am using the method findIndex
        const indexData = newData.findIndex(item => item._id == passData._id)
        newData[indexData] = passData
        
        setData(newData)
        setSubjects(newData)
    }

    function handlePressDeleteSubject(subject) {
        if (subject.associatedReviews.length == 0) {
            api.delete("/deleteSubject", {
                params: {
                    id: subject._id
                }
            }).then((response) => {
                if (response) {
                    alert("Disciplina deletada com sucesso!")
                    const newData = data.filter(item => item._id != subject._id)
                    setData(newData)
                    setSubjects(newData)
                }
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!.")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar deletar sua disciplina no banco de dados, tente novamente!')
                }
            })
        } else {
            alert("Você não pode deletar esta disciplina, pois ainda há revisões associadas a ela!")
        }
    }



    return (
        <>
            <View style={styles.container}>
                {data != null && 
                    <FlatList
                        style={styles.flatlist}
                        data={data}
                        keyExtractor={ item => item._id}
                        renderItem={({item}) => <SubjectContainer onPressEdit={() => handlePressGoToEditScreen(item)} onPressDelete={() => handlePressDeleteSubject(item)} data={item} />}
                    />
                }
                <FloatAddButton onPress={handlePressGoToAddSubjectScreen}/>
                {handleOpenTutorialModal ? 
                    <ScreenTutorial 
                        steps={[Step0, Step1, Step2]}
                        handleCloseModal={() => setHandleOpenTutorialModal(false)}
                        />    
                    : null
                }
            </View>
            <View style={styles.adBox}>
                <BannerAd
                    unitId={"ca-app-pub-9301871566936075/8490963413"}
                    // unitId={TestIds.BANNER}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                    }}
                    onAdLoaded={() => {
                        console.log('Advert loaded')
                    }}
                    onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);}}
                />
                <Text style={styles.adBoxLabel}>Área para anúncios.</Text>
            </View>
        </>
    )
    
}

export default SubjectScreen;