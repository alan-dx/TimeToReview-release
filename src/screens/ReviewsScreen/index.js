import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, ToastAndroid, Text, PermissionsAndroid, Alert, BackHandler, Button, Dimensions } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import CicleContainer from '../../components/CicleContainer';
import timeFormat from '../../utils/formatDateTime';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import PlayerModal from '../../components/PlayerModal';
import NotesModal from '../../components/NotesModal';
import ImageModal from '../../components/ImageModal';
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';

const ReviewsScreen = (props) => {

    const currentDate = new Date()

    const { reviews, subjects, routines, allReviews, setAllReviews, performance, setPerformance, logoutContext, premium } = useContext(AuthContext)

    const [data, setData] = useState(reviews)
    const [dataCycles, setDataCycles] = useState(performance[currentDate.getDay()].cycles)
    const navigation = useNavigation()
    const [startController, setStartController] = useState(true)
    const [reviewInitTime, setReviewInitTime] = useState(new Date())
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [handleOpenPlayerModal, setHandleOpenPlayerModal] = useState(false)
    const [handleOpenNotesModal, setHandleOpenNotesModal] = useState(false)
    const [handleOpenImageModal, setHandleOpenImageModal] = useState(false)
    const [trackPlayer, setTrackPlayer] = useState('')
    const [notesToShow, setNotesToShow] = useState(null)
    const [imageReview, setImageReview] = useState('')
    const [adLabel, setAdLabel] = useState(true)

    const cycleFlatList = useRef(null)

    useEffect(() => {//pass params to Header
        console.log(premium)
        
        navigation.setParams({//cause the warn error: "SET_PARAMS dont handled by any navigator...", but don't worry is working fine
            finishCycleActive: startController,
            handleStopCycle: handleStopCycle
        })

        BackHandler.addEventListener("hardwareBackPress", () => {
            //listener to call onGoBack function to update the ChartMenu component, because goBack action doesn't re-render the screen and components
            //and to end current cycle also onGoBack

            if (!startController) {//I could call handleStartStopController or this
                handleStopCycle()
            }

            props.route?.params.onGoBack()//call function onGoBack to UpdateChart
            navigation.goBack()

            return true // to disable back button original action
        // if not disable, this is will cause a double goBack()
        })

    }, [startController])

    useEffect(() => {

        async function setupPlayer() {
            await TrackPlayer.setupPlayer()
            TrackPlayer.updateOptions({
                stopWithApp: true,
            });
        }

        setupPlayer()
        
    }, [])

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Icon3 name="exception1" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Esta é a tela de Revisões.
            {"\n"}
            {"\n"}
            Aqui você irá visualizar as revisões listadas para o dia e onde também poderá concluir, editar e adicionar novas revisões.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Esse é o botão que você ira utilizar quando desejar criar novas revisões!
            {'\n'}
            {'\n'}
            Ao pressioná-lo, você será enviado para a tela de Adicionar Revisões.
        </Text>
    </View>
    let Step2 = <View style={stylesSteps.container}>
        <View style={stylesSteps.timerBox}>
            <View style={stylesSteps.timerController}>
                <Icon  name="check" size={25} color="#303030" />
            </View>
            <Text style={stylesSteps.timerText2}>Início: 17:25:32</Text>
                <Text style={stylesSteps.timerText2}> Término: 17:48:12</Text>
                <View>
                    <Text style={stylesSteps.timerText2}>Cont.</Text>
                    <View style={stylesSteps.timerCountReviews}>
                            <Text style={stylesSteps.timerText}>7</Text>
                    </View>
                </View>
                <View style={stylesSteps.timerChronometerBox}>
                    <Text style={stylesSteps.timerText2}>Período</Text>
                    <View style={stylesSteps.timerChronometer}>
                        <Text style={stylesSteps.timerText}>00:27:40</Text>
                    </View>
                </View>
        </View>
        <Text style={stylesSteps.desciptionText}>Esse é o controlador de ciclos.
            {"\n"}
            {"\n"}
            Seu objetivo é auxiliar no gerenciamento de seu desempenho e calcular o tempo gasto em cada período de revisão.
            {"\n"}
            {"\n"}
            O seu funcionamento é automatizado, sempre que você interage com uma revisão um ciclo é iniciado e o mesmo é finalizado ao voltar para o menu,
            entretanto você também pode controlá-lo manualmente, criando e finalizando quantos ciclos quiser.
        </Text>
    </View>
    let Step3 = <View style={stylesSteps.container}> 
    <ReviewContainer 
            titleRightButton="CONCLUIR" 
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
            É dessa forma que as revisões serão visualizadas, ao pressionar o botão "CONCLUIR" a revisão será concluída e a próxima
            data de revisão automaticamente calculada.
            {"\n"}
            {"\n"}
            O marcador colorido indica a qual matéria a revisão pertence, também é possível visualizar a sequência associada.
        </Text>
    </View>
    let Step4 = <View style={stylesSteps.container}> 
        <Icon2 name="date-range" size={40} color="#cc0000" />
        <Text style={stylesSteps.desciptionText}>
            Revisão em atraso!
            {"\n"}
            {"\n"}
            Quando uma revisão estiver atrasada este símbolo aparece junto ao seu container.
        </Text>
    </View>
    let Step5 = <View style={stylesSteps.container}> 
        <Icon2 name="library-books" size={40} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Visualizar anotações!
            {"\n"}
            {"\n"}
            Durante a criação de uma revisão você também pode associar uma anotação, para visualizá-la pressione o
            ícone acima no container da revisão desejada.
        </Text>
    </View>
    let Step6 = <View style={stylesSteps.container}> 
        <Icon2 name="library-music" size={40} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Ouvir áudio associado!
            {"\n"}
            {"\n"}
            Além disso, você pode associar, também, um arquivo de áudio na revisão, ao pressionar o ícone acima (presente no container)
            o player será inicializado.
        </Text>
    </View>
    let Step7 = <View style={stylesSteps.container}> 
        <Icon2 name="collections" size={40} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Visualizar imagem associada!
            {"\n"}
            {"\n"}
            Por fim, você pode associar uma imagem à uma revisão e ao pressionar o ícone acima no container da revisão a foto pode ser visualizada.
            {"\n"}
            {"\n"}
            Dica: Tire foto de seu resumo, fluxograma ou mapa mental e anexe nas revisões do App.
        </Text>
    </View>
    
    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeReviewsScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeReviewsScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    async function handleConcludeReview(id) {
        const currentDate = new Date()
        currentDate.setUTCHours(5,0,0,0)

        api.post('/concludeReview',null, {
            params: {
                id: id,
                date: currentDate
            }
        }).then((response) => {
            const newAllReviews = allReviews
            const index = allReviews.findIndex(item => item._id == id)
            newAllReviews[index] = response.data
            setAllReviews(newAllReviews)
            
        }).catch((err) => {
            console.log(err)
            if (err == 'Error: Request failed with status code 500') {
                alert("Erro interno do servidor, tente novamente mais tarde!")
            } else if (err = 'Error: Network Error') {
                alert("Sessão expirada!")
                logoutContext()
            } else {
                alert('Houve um erro ao tentar concluir sua revisão, tente novamente!')
            }
        })

        const newData = data.filter(item => item._id != id)//to update flatlist, removing the conclude review
        setData(newData)
        dataCycles[dataCycles.length - 1].reviews++
        setDataCycles(dataCycles)
        performance[currentDate.getDay()].reviews++
        setPerformance(performance)
        
        if (startController) {
            handleStartStopCycleController()
        }
    }

    async function handlePressGoToAddScreen() {

        if ((subjects.length != 0) && (routines.length != 0)) {

            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]).then((response) => {
                if(response["android.permission.READ_EXTERNAL_STORAGE"] == 'denied') {
                    alert('Precisamos dessa permissão para permitir que você associe imagens e arquivos de áudio em suas revisões. Por favor realize o processo novamente!')
                } else {
                    navigation.navigate("AddScreen", {
                        onGoBack: handleUpdateDataOnAdd
                    })
                }
            }).catch((err) => {
                console.log(err)
            });

        } else {
            Alert.alert(
                "Ops... calma ai!",
                "Você não criou nenhuma disiciplina/sequência ainda, antes de criar uma revisão é necessário ter ao menos uma disciplina e sequência criadas.",
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

    function handleUpdateDataOnAdd(passData) {
        console.log('chaou')
        if (passData) {
            setData([...data, passData])
        }

        BackHandler.addEventListener("hardwareBackPress", () => { //placed here again because on EditScreen it's necessary disable adding another listener
            //listener to call onGoBack function to update the ChartMenu component, because goBack action doesn't re-render the screen and components
            //and to end current cycle also onGoBack
            console.log('asd')
            if (!startController) {//I could call handleStartStopController or this
                handleStopCycle()
            }

            props.route?.params.onGoBack()//call function onGoBack to UpdateChart
            navigation.goBack()

            return true // to disable back button original action
            // if not disable, this is will cause a double goBack()
        })
    }

    async function handleGoToEditScreen(screenData) {

        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then((response) => {
            if(response["android.permission.READ_EXTERNAL_STORAGE"] == 'denied') {
                alert('Precisamos dessa permissão para permitir que você associe imagens e arquivos de áudio em suas revisões. Por favor realize o processo novamente!')
            } else {

                console.log(screenData)
                navigation.navigate("EditScreen", {
                    screenData: screenData,
                    fromReviewsScreen: true,
                    onGoBack: handleUpdateDataOnEdit
                })

            }
        }).catch((err) => {
            console.log(err)
        });


    }

    function handleUpdateDataOnEdit(passData) {
        if (passData) {
            console.log('popuuu')
            const newData = data
            setData([])
            const index = data.findIndex(item => item._id == passData._id)
            newData[index] = passData
            setData(newData)
        }

        BackHandler.addEventListener("hardwareBackPress", () => { //placed here again because on EditScreen it's necessary disable adding another listener
            //listener to call onGoBack function to update the ChartMenu component, because goBack action doesn't re-render the screen and components
            //and to end current cycle also onGoBack
        console.log('asd')
            if (!startController) {//I could call handleStartStopController or this
                handleStopCycle()
            }

            props.route?.params.onGoBack()//call function onGoBack to UpdateChart
            navigation.goBack()

            return true // to disable back button original action
        // if not disable, this is will cause a double goBack()
        })

    }

    async function handleStopCycle() { //created because need pass it to Header component like a component

        console.log('-------> call handleStopCycle')
        setStartController(true)
        const currentDate = new Date()

        let chronometer = new Date(currentDate - reviewInitTime)
        dataCycles[dataCycles.length - 1].finish = timeFormat(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())
        dataCycles[dataCycles.length - 1].do = true
        dataCycles[dataCycles.length - 1].chronometer = chronometer

        dataCycles.push({
            init: '00:00:00', 
            finish: '00:00:00', 
            reviews: 0, 
            chronometer: new Date(new Date().setUTCHours(0,0,0,0)),
            do: false
        })

        // setDataCycles(dataCycles)

        await api.post('/concludeCycle', {
            day: currentDate.getDay(),
            cycles: dataCycles
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            alert(err)
        })

        ToastAndroid.show('Novo ciclo criado!', 1600)

    }

    async function handleStartStopCycleController() {
        
        const currentDate = new Date()

        if (startController) {

            setStartController(false)
            setReviewInitTime(currentDate)
            dataCycles[dataCycles.length - 1].init = timeFormat(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())

            setDataCycles(dataCycles)

            ToastAndroid.show('Ciclo iniciado!', 1500)

        } else {

            handleStopCycle()//have note on function scope

        }
    }

    async function handleStartAudioPlayer(track) {
        //ASSOCIAR AUDIO DO GOOGLE DRIVE
    
        if (startController) {
            handleStartStopCycleController()
        }
    
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then((response) => {
            if(response["android.permission.READ_EXTERNAL_STORAGE"] == 'denied') {
                alert('Precisamos dessa permissão para ler o arquivo de áudio associado. Por favor realize o processo novamente!')
            } else {
                setHandleOpenPlayerModal(true)
                setTrackPlayer(track)
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    function handleStopAudioPlayer() {
        setHandleOpenPlayerModal(false)
        setTrackPlayer('')
    }

    function handleCloseNotesModal() {
        setHandleOpenNotesModal(false)
    }

    function handleShowNotes(notes) {
        setHandleOpenNotesModal(true)
        setNotesToShow(notes)
        
        if (startController) {
            handleStartStopCycleController()
        }

    }

    async function handleShowImage(image) {

        if (startController) {
            handleStartStopCycleController()
        }
    
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then((response) => {
            if(response["android.permission.READ_EXTERNAL_STORAGE"] == 'denied') {
                alert('Precisamos dessa permissão para apresentar a imagem associada. Por favor realize o processo novamente!')
            } else {
                if (premium) {
                    setImageReview(image)
                } else {
                    setImageReview(image[0])
                }
                setHandleOpenImageModal(true)
            }
        }).catch((err) => {
            console.log(err)
        });
    
    }

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    horizontal
                    ref={cycleFlatList}
                    style={styles.flatlistCycle}
                    data={dataCycles}
                    decelerationRate='normal'
                    keyExtractor={(item, index) => `${index}`}
                    onContentSizeChange={() => cycleFlatList.current.scrollToEnd()}
                    onMomentumScrollEnd={(e) => {
                        console.log(e.nativeEvent)
                        console.log(Math.round(e.nativeEvent.contentOffset.x/e.nativeEvent.layoutMeasurement.width))
                        cycleFlatList.current.scrollToIndex({
                            index: Math.round(e.nativeEvent.contentOffset.x/e.nativeEvent.layoutMeasurement.width),//to get the index of the central element
                            viewOffset: 0,
                            viewPosition: 0.5//to run whenever it passes from the center
                        });
                    }}
                    renderItem={item => 
                        <CicleContainer
                            data={item}
                            handleStartPauseController={handleStartStopCycleController} 
                            startController={startController} 
                        />
                    }
                />
                {data != null &&
                    <FlatList 
                        style={styles.flatlist} 
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => 
                            <ReviewContainer 
                                haveDelay={true} 
                                titleRightButton="CONCLUIR" 
                                data={item} onPressConclude={() => handleConcludeReview(item._id)} 
                                onPressEdit={() => handleGoToEditScreen(item)}
                                haveExtraOptions={true}
                                onPressAudioButton={() => handleStartAudioPlayer(item.track)}
                                onPressNotesButton={() => handleShowNotes(item.notes)}
                                onPressImageButton ={() => handleShowImage(item.image)}
                            />
                        }
                        contentContainerStyle={{paddingBottom: 160 }}
                        
                    />
                }
                <FloatAddButton onPress={handlePressGoToAddScreen}/>
                {
                handleOpenTutorialModal ? 
                    <ScreenTutorial 
                        handleCloseModal={() => setHandleOpenTutorialModal(false)}

                        steps={[Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7]}
                    />
                    : null
                }
                {
                    handleOpenPlayerModal ?
                    <PlayerModal 
                        modalVisible={handleOpenPlayerModal}
                        handleCloseModal={handleStopAudioPlayer}
                        track={trackPlayer}
                    />
                    : null
                }
                {
                    handleOpenNotesModal ?
                    <NotesModal 
                        modalVisible={handleOpenNotesModal}
                        handleCloseModal={handleCloseNotesModal}
                        notes={notesToShow}
                    />
                    :
                    null
                }
                {   
                    handleOpenImageModal ?
                    <ImageModal
                        modalVisible={handleOpenImageModal}
                        handleCloseModal={() => {
                            setHandleOpenImageModal(false)
                            setImageReview('')
                        }}
                        image={imageReview}
                    /> : null
                }
            </View>
            {
                !premium &&
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
            }
        </>
    )
    
}

export default ReviewsScreen;