import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert, Image, ToastAndroid, TouchableHighlight } from 'react-native';

import styles from './styles';
import stylesSteps from './stylesSteps';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/ChartLine';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';
import logoImage from '../../assets/images/icons/logo.png';
import CustomModal from '../../components/CustomModal';

const HomeScreen = () => {

    //OPÇÕES (PRO) => REVISÕES, ROTINAS, MATÉRIAS, LISTAR TODAS AS REVISÕES, CONFIGURAÇÕES, SOBRE
    //OPÇÕES (BASIC) => REVISÕES, ROTINAS, LISTAR TODAS AS REVISÕES, MATÉRIAS, CONFIGURAÇÕES, TORNE-SE PREMIUM

    //Gambi? => As react navigation goBack does not cause the screen to render again, the chart was not updating. That was the only functional solution I found.

    const navigation = useNavigation()
    const { performance, subjects, routines, allReviews, setReviews } = useContext(AuthContext);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [isLoading] = useState(false)
    const [dataChart, setData] = useState(performance)
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [handleOpenBePremiumModal, setHandleOpenBePremiumModal] = useState(false)
    const [handelShowTips0, setHandleShowTips0] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const currentDate = new Date()
            currentDate.setHours(5,0,0,0)
            const filteredReviews = allReviews.filter(item => new Date(item.dateNextSequenceReview) <= currentDate)
            setReviews(filteredReviews)
            setNumberOfReviews(filteredReviews.length)
            // setLoadingChart(true)//Gambi (solved)

            checkIfItsTheFirstTime()

        }, [allReviews])
    )

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <View style={styles.logoBox}>
            <Image source={logoImage} style={{width: 170, height: 170}} />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Seja bem-vindo ao TimeToReview!
            {"\n"}
            {"\n"}
            Esse é o menu do aplicativo, onde você poderá navegar pelas telas e acessar as funções do App.
            {"\n"}
            {"\n"}
            Você visualizará um breve tutorial em cada tela que acessar, o objetivo é lhe familiarizar com o ambiente.
        </Text>
    </View>

    let Step1 = <View style={stylesSteps.container}>
        <Text style={stylesSteps.desciptionText}>
            TimeToReview é um aplicativo desenvolvido com o intuito de auxiliar e melhorar o desempenho de seus usuários nos estudos. 
            {"\n"}
            {"\n"}
            A motivação para desenvolver essa aplicação é baseada na Curva do Esquecimento, um conceito apresentado pelo psicólogo alemão Hermann Ebbinghaus.
            {"\n"}
            {"\n"}
            Se você quer saber mais sobre o assunto, verifique a sessão "Sobre" nas configurações.
        </Text>
    </View>

    let Step2 = <View style={stylesSteps.container}>
        <Icon2 style={{marginBottom: 10}} name="clock" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Lembrete de revisão!
            {"\n"}
            {"\n"}
            Na tela de configurações você pode escolher o horário no qual o aplicativo irá notificá-lo.
        </Text>
    </View>

    let Step3 = <View style={stylesSteps.container}>
        <Icon2 style={{marginBottom: 10}} name="airplay" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Sobre os anúncios!
            {"\n"}
            {"\n"}
            Ao utilizar o TimeToReview você irá encontrar anúncios em algumas telas, mas não se preocupe eles foram elaborados e 
            posicionados de modo que não interfiram significativamente na experiência do usuário.
            {"\n"}
            {"\n"}
            Os anúncios são uma das formas que nós desenvolvedores independentes temos de gerar receita com os softwares desenvolvidos e assim
            continuar criando, mantendo e custeando nossas aplicações.
        </Text>
    </View>

    let Step4 = <View style={stylesSteps.container}>
        <Icon2 style={{marginBottom: 10}} name="trending-up" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Seja Premium!
            {"\n"}
            {"\n"}
            Caso deseje, é possível eliminar os anúncios e obter benefícios exclusivos com a versão Premium do TimeToReview. 
            {"\n"}
            {"\n"}
            Para obter mais informações verifique a sessão "Seja Premium" no Menu.
        </Text>
    </View>

    async function checkIfItsTheFirstTime() { //See useFocusEffect
        const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeHomeScreen")
        console.log('first', firstTimeOnScreen)
        if (!firstTimeOnScreen) {
            setHandleOpenTutorialModal(true)
            await AsyncStorage.setItem('@TTR:firstTimeHomeScreen', 'true')
        }

    }
    //User tutorial

    function handleClickGoToReviewsScreen() {
        navigation.navigate('ReviewsScreen', {
            onGoBack: handleUpdateChartOnBack
        })
    }

    function handleUpdateChartOnBack() {
        //to update homescreen chart (solved Gambi)
        // setLoadingChart(false)//Gambi
        setData(performance)
    }

    function handleClickGoToRoutineScreen() {
        navigation.navigate('RoutineScreen')
    }

    function handleClickGoToSubjectScreen() {
        navigation.navigate('SubjectScreen')
    }

    function handleClickGoToSettingScreen() {
        navigation.navigate('SettingScreen')
    }

    function handleClickGoToPerformanceScreen() {
        if (subjects.length != 0 && routines.length != 0) {
            navigation.navigate('PerformanceScreen')
        } else {
            Alert.alert(
                "Ops... calma ai!",
                "Você não criou nenhuma disiciplina/sequência ainda, antes de visualizar os dados de desempenho é necessário ter ao menos uma sequênica e disciplina criadas.",
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

    async function handleOpenBePremium() {

        setHandleOpenBePremiumModal(true)

    }

    async function handleCloseBePremium() {
        setHandleOpenBePremiumModal(false)
    }

    function handleClickGoToAllReviewsScreen() {
        navigation.navigate("AllReviewsScreen")
    }

    const homeDash = <>
        <View style={styles.graphBox}>
            <Text style={styles.graphBoxTitle}>Você possui {numberOfReviews} {numberOfReviews == 1 ? 'revisão pendente!' : 'revisões pendentes!'}</Text>
            {/* NESSE GRÁFICO INDICAR A QUANTIDADE DE REVISÕES POR DIA */}
            <Chart showLabel height={Dimensions.get("window").height * 0.3} elevation={2} data={dataChart} />
            <View style={styles.performanceBox}>
                <View style={styles.performanceButtonBox}>
                    <BorderlessButton onPress={handleClickGoToPerformanceScreen} style={styles.performanceButton}>
                        <Icon name="linechart" size={22} color="#FFF" />
                    </BorderlessButton>
                </View>
                <Text style={styles.performanceButtonText}>Visualizar desempenho completo</Text>
            </View>
        </View>

        <View style={styles.menuBox}>
            <View style={styles.menuRow}>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToReviewsScreen} title="Revisões" subtitle="15 Revisões Cadastradas">
                        <Icon name="exception1" size={25} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToRoutineScreen} title="Sequências">
                        <Icon name="sync" size={25} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToAllReviewsScreen} title="Todas Revisões">
                        <Icon name="profile" size={25} color="#303030" />
                    </MenuButton>
                </View>
            </View>
            <View style={styles.menuRow}>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToSubjectScreen} title="Disciplinas">
                        <Icon name="book" size={28} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleOpenBePremium} title="Seja Premium">
                        <Icon2 name="trending-up" size={28} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToSettingScreen} title="Configurações">
                        <Icon name="setting" size={28} color="#303030" />
                    </MenuButton>
                </View>
            </View>
        </View>
        { handleOpenTutorialModal ? 
            <ScreenTutorial 
                steps={[Step0, Step1, Step2, Step3, Step4]} 
                handleCloseModal={() => setHandleOpenTutorialModal(false)}
            /> :
            null
        }
        {
            handleOpenBePremiumModal ? 
                <CustomModal
                    modalVisible={handleOpenBePremiumModal}
                    handleCloseModalButton={handleCloseBePremium}
                    modalCardHeight={250}
                    modalTitle="SEJA PREMIUM"
                    doNotShowCheckButton
                >
                    <View style={styles.bePremiumModalInfoBox}>
                        <Text style={styles.bePremiumModalInfoText}>
                            Obtenha a versão Premium do TimeToReview e tenha acesso a benefícios exclusivos.
                        </Text>
                    </View>
                    <TouchableHighlight style={styles.bePremiumModalCustomButton} underlayColor={"#72c3eb"} onPress={() => {
                        ToastAndroid.show('Em breve', 600)
                    }}>
                        <Text style={styles.bePremiumModalCustomButtonText}>VAMOS-LÁ!</Text>
                    </TouchableHighlight>
                </CustomModal> : null
        }
    </>

    return (
        <View style={styles.container}>
            {!isLoading ? homeDash : <Text>Carregando</Text>}
        </View>
    )
}

export default HomeScreen;