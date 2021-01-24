import React, { useState, useEffect, useContext } from 'react';
import {Switch, View, Text, FlatList, ToastAndroid, Alert } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { RectButton } from 'react-native-gesture-handler';
import CustomModal from '../../components/CustomModal';
import PickerInfo from '../../components/Picker';

const AllReviewsScreen = (props) => {

    //PARA FAZER O FILTRO UTILIZE DOIS CAMPOS (ROTINAS E MATÉRIAS), QUANDO SELECIONAR UMA ROTINA/MATÉRIA
    //PARA FILTRAR A LISTA EDITE O DATA DO FLATLIST FILTRANDO AS REVISÕES

    const { allReviews, setAllReviews, subjects, setSubjects, routines, setRoutines, logoutContext } = useContext(AuthContext)

    const [data, setData] = useState(allReviews)
    const navigation = useNavigation()
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [handleOpenFilterModal, setOpenFilterModal] = useState(false)
    const [listIsFiltered, setListIsFiltered] = useState(false)
    //FilterList
    const [isEnabled, setIsEnabled] = useState(true)
    const [filterOption, setFilterOption] = useState(null)
    //FilterList


    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Icon2 name="exception1" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Essa é a tela que irá listar todas as suas revisões.
            {"\n"}
            {"\n"}
            Aqui você pode visualizar, editar ou deletar uma revisão.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}> 
    <ReviewContainer 
            titleRightButton="DELETAR" 
            data={{
                routine_id: {sequence: ["1", "2", "4", "5"]},
                subject_id: {marker: '#60c3eb'},
                timer: '13:00',
                title: 'REVISÃO X',
                notes: {
                    title: 'ratata',
                    note: '',
                    align: 'left'
                },
                track: {
                    id: '11111',
                    url: '11111',
                    type: 'default',
                    title: 'dasdsad',
                    artist: 'asdsdsd',
                    album: 'TTR - audios',
                    artwork: 'https://picsum.photos/100',
                }

            }} 
            onPressConclude={() => {}} 
            onPressEdit={() => {}}
            onPressAudioButton={() => {}}
            onPressNotesButton={() => {}}
        />
        <Text style={stylesSteps.desciptionText}>
            Container de Revisão.
            {"\n"}
            {"\n"}
            É dessa forma que as revisões serão visualizadas, observe que existe um botão "EDITAR" e outro "DELETAR",
            o primeiro permite que você edite todos os detalhes da revisão, já o segundo deleta permanentemente a mesma.
            {"\n"}
            {"\n"}
            O marcador colorido indica a qual matéria a revisão é associada.
        </Text>
    </View>
    let Step2 = <View style={stylesSteps.container}>
        <View style={styles.filterButton}>
            <Text style={styles.filterText}>Filtrar</Text>
            <Icon name="search" size={20} color="#303030" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Este botão permite filtrar a lista de revisões a partir das matérias ou sequência existentes.
        </Text>
    </View>
    let Step3 = <View style={stylesSteps.container}>
        <View style={styles.filterOptionsButton}>
            <Icon name="filter" size={20} color="#303030" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Este ícone indica se há um filtro aplicado na lista.
        </Text>
        <View style={[styles.filterOptionsButton, {marginTop: 10}]}>
            <Icon name="list" size={20} color="#303030" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Por fim, este botão remove o filto existente.
        </Text>
    </View>

    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeAllReviewsScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeAllReviewsScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    //FilterList
    function toggleSwitchFilterModal() {
        setFilterOption(null)
        setIsEnabled(previousState => !previousState)
    }
    //FilterList

    async function handleDeleteReview(review) {
        
        Alert.alert(
            "Atenção!",
            "Você realmente deseja deletar esta revisão?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Sim, eu quero!", onPress: () => {
                api.delete('/deleteReview', {
                    params: {
                        id: review._id
                    }
                }).then((response) => {
                    ToastAndroid.show("Revisão deletada com sucesso!",600)
                }).catch((err) => {
                    console.log(err)
                    if (err == 'Error: Request failed with status code 500') {
                        alert("Erro interno do servidor, tente novamente mais tarde!")
                    } else if (err = 'Error: Network Error') {
                        alert("Sessão expirada!")
                        logoutContext()
                    } else if (err = 'Error: Request failed with status code 401') {
                        alert('Opa! Isso não deveria acontecer, entre em contato com o suporte relatando um erro do tipo NTO')
                    } else {
                        alert('Houve um erro ao tentar deltar sua revisão no banco de dados, tente novamente!')
                    }
                })
        
				const newData = data.filter(item => item._id != review._id)//to update flatlist
				setData(newData)
				setAllReviews(allReviews.filter(item => item._id != review._id))//to resolve the bug of delete a review with filter applied
        
                const newSubjects = subjects
                const indexSubject = subjects.findIndex(item => item._id == review.subject_id._id)
                newSubjects[indexSubject].associatedReviews = subjects[indexSubject].associatedReviews.filter(item => review._id != item)
                // console.log(subjects[index].associatedReviews.filter(item => review._id != item))
        
                const newRoutines = routines
                const indexRoutine = routines.findIndex(item => item._id == review.routine_id._id)
                newRoutines[indexRoutine].associatedReviews = routines[indexRoutine].associatedReviews.filter(item => review._id != item)
        
                setSubjects(newSubjects)
                setRoutines(newRoutines)
              }}
            ],
            { cancelable: false }
          );

        
    }

    function handleGoToEditScreen(screenData) {
        navigation.navigate("EditScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {
        const newData = data
        setData([])
        const index = data.findIndex(item => item._id == passData._id)
        newData[index] = passData
        setData(newData)
        // setReviews(newData)
        
    }

    function handleOpenFilter() {
        setOpenFilterModal(true)
    }

    function handleCloseAndConfirmFilterModal() {
        setOpenFilterModal(false)
        if (filterOption) {
            //use _id because it is on both (subjects and routines) and is unique
            setData(allReviews.filter(item => {
                return (item.subject_id._id == filterOption._id) || (item.routine_id._id == filterOption._id) 
            }))
            setListIsFiltered(true)
        }
    }

    function handleCloseAndCancelFilterModal() {
        setOpenFilterModal(false)
    }

    function handleVerifyIsFilterd() {
        if (listIsFiltered) {
            ToastAndroid.show('Revisões filtradas!', 600)
        } else {
            ToastAndroid.show('Revisões SEM filtro!', 600)
        }
    }

    function handleResetList() {
        if (listIsFiltered) {
            setData(allReviews)
            ToastAndroid.show("Filtro removido!", 600)
            setListIsFiltered(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterBox}>
                <View style={{flexDirection: 'row'}}>
                    <RectButton style={styles.filterOptionsButton} onPress={handleVerifyIsFilterd}>
                        {
                            listIsFiltered 
                            ?
                            <Icon name="filter" size={20} color="#303030" />
                            :
                            <Icon name="filter" size={20} color="#F0F0F0" />
                        }
                    </RectButton>
                    <RectButton style={styles.filterOptionsButton} onPress={handleResetList}>
                        <Icon name="list" size={20} color="#303030" />
                    </RectButton>
                </View>
                <RectButton style={styles.filterButton} onPress={handleOpenFilter}>
                    <Text style={styles.filterText}>Filtrar</Text>
                    <Icon name="search" size={20} color="#303030" />
                </RectButton>
            </View>
            {data != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <ReviewContainer titleRightButton="DELETAR" data={item} onPressConclude={() => handleDeleteReview(item)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
            {handleOpenTutorialModal ? 
                <ScreenTutorial
                    handleCloseModal={() => setHandleOpenTutorialModal(false)}
                    steps={[Step0, Step1, Step2, Step3]}
                />
                : null
            }
            {
                handleOpenFilterModal ?
                <CustomModal
                    modalVisible={handleOpenFilterModal}
                    handleCloseModalButton={handleCloseAndCancelFilterModal} 
                    handleConfirmModalButton={handleCloseAndConfirmFilterModal}
                    modalCardHeight={310}
                    modalTitle="FILTRAR REVISÕES"
                >
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.filterModalTitleOptions}>Filtrar por:</Text>
                        <View style={styles.filterModalOptionsBox}>
                            <View style={styles.filterModalSwitchItemBox}>
                                <Text style={styles.filterModalSwitchItemText}>Disciplina</Text>
                                <Switch 
                                    trackColor={{ false: "#60c3eb", true: "#e74e36" }}
                                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchFilterModal}
                                    value={isEnabled}
                                />
                                <Text style={styles.filterModalSwitchItemText}>Sequência</Text>
                            </View>
                        </View>
                    </View>
                    {
                        isEnabled
                            &&
                        <PickerInfo 
                            placeholder="1-3-5-7-21-30" 
                            data={routines}
                            onChangeItem={setFilterOption}
                        />

                    }
                    {
                        !isEnabled
                            &&
                        <PickerInfo 
                            placeholder="CÁLCULO III" 
                            data={subjects}
                            onChangeItem={setFilterOption}
                        />
                    }
                    <Text style={styles.filterModalInfoText}>Selecione uma disciplina ou sequência para filtrar suas revisões.</Text>
                </CustomModal>
                : null
            }
        </View>
    )
    
}

export default AllReviewsScreen;