import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert, Image, ToastAndroid, TouchableHighlight, Appearance } from 'react-native';

import styles from './styles';
import stylesSteps from './stylesSteps';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/ChartLine';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';
import logoImage from '../../assets/images/icons/logo.png';
import CustomModal from '../../components/CustomModal';
import TipsModal from '../../components/TipsModal';
import notifications from '../../services/notifications';

const HomeScreen = () => {

    const navigation = useNavigation()
    const { performance, subjects, routines, allReviews, setReviews, premium, setPremium } = useContext(AuthContext);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [isLoading] = useState(false)
    const [dataChart, setData] = useState(performance)
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [handleOpenTipsModal, setHandleOpenTipsModal] = useState(false)
    const [handelShowTips0, setHandleShowTips0] = useState(false)

    useEffect(() => {
        if (Appearance.getColorScheme() == 'dark') {
            ToastAndroid.show('Aplicativo em Dark Mode, cores alteradas pelo próprio dispositivo!', 2800)
        }
    }, [])

    //verifing if is the first time open app
    useEffect(() => {

        async function handleFirstTimeOnApp() {

            const firstTimeOnApp = await AsyncStorage.getItem("@TTR:firstTimeOnApp")
    
            if (!firstTimeOnApp) {
                console.log('calll')
                const currentDate = new Date()
                currentDate.setHours(8,30,0,0)
                console.log(currentDate)
    
                notifications
                .configure()
                .localNotificationSchedule(
                    {
                        channelId: "default-channel-id",
                        title:'TimeToReview!',
                        message:`É hora de revisar, vamos lá? Não deixe pra depois...`,
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()),
                        vibrate:500,
                        priority: "high",
                        repeatType: "day",
                        allowWhileIdle: true
                    }
                )
    
                await AsyncStorage.setItem('@TTR:firstTimeOnApp', 'true')
    
            }

        }

        handleFirstTimeOnApp()
    }, [])
    //verifing if is the first time open app

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
        <Icon style={{marginBottom: 10}} name="checkcircleo" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Sobre as permissões!
            {"\n"}
            {"\n"}
            Algumas permissões de acesso ao seu dispositivo serão solicitadas, é de extrema importância que você as permita para um correto funcionamento do aplicativo.
            {"\n"}
            {"\n"}
            As permissões são as seguintes: Acessar arquivos em geral (fotos, media, áudio, etc) na mémoria compartilhada do dispositivo e acesso à sua câmera. 
            {"\n"}
            {"\n"}
            A primeira é necessária para anexar 
            arquivos de áudio e imagem nas suas revisões, já a segunda é utilizada na hora de definir uma foto de perfil.
        </Text>
    </View>

    let Step4 = <View style={stylesSteps.container}>
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

    let Step5 = <View style={stylesSteps.container}>
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

    let Step5_P = <View style={stylesSteps.container}>
        <Icon2 style={{marginBottom: 10}} name="trending-up" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Obrigado por adquirir o TimeToReview Premium!
            {"\n"}
            {"\n"}
            Agora você tem acesso a todos os benefícios e atualizações futuras dessa versão, muitas novidades virão, então mantenha o app sempre atualizado.
        </Text>
    </View>

    let Step6 = <View style={stylesSteps.container}>
        <Icon2 style={{marginBottom: 10}} name="moon" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Aplicativo em Dark Mode!
            {"\n"}
            {"\n"}
            Se você utiliza o Dark Mode (Tema Escuro) em seu dispositivo, as cores do aplicativo serão adaptadas (pelo próprio aparelho) para adequá-lo ao tema.
            {"\n"}
            {"\n"}
            Cabe ressaltar que, dependendo da versão de seu Android, a adaptação de cores pode não ser perfeita em algumas telas, gerando algumas inconsistências. Porém, isso não interfere no uso da aplicação.
        </Text>
    </View>

    let Step7 = <View style={stylesSteps.container}>
    <Icon2 style={{marginBottom: 10}} name="mail" size={35} color="#303030" />
    <Text style={stylesSteps.desciptionText}>
        Verifique sua conta!
        {"\n"}
        {"\n"}
        Para garantia de processos, como recuperação de senha e contato com o suporte, é de extremamente importância que você
        confirme o email associado a sua conta.
        {"\n"}
        {"\n"}
        Para fazer isso, basta verificar a sessão "Verificar conta" nas configurações.
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

    async function handleShowTipsModal() {

        const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeOpenTips")
        
        if (!firstTimeOnScreen) {
            await AsyncStorage.setItem('@TTR:firstTimeOpenTips', 'true')
            setHandleShowTips0(true)
            setHandleOpenTipsModal(true)
        } else {
            setHandleShowTips0(false)
            setHandleOpenTipsModal(true)
        }

    }

    async function handleCloseTipsModal() {
        setHandleOpenTipsModal(false)
    }

    function handleClickGoToAllReviewsScreen() {
        navigation.navigate("AllReviewsScreen")
    }

    function handleGoToBePremiumScreen() {
        navigation.navigate("BePremiumScreen")
    }

    const homeDash = <>
        <View style={styles.graphBox}>
            <Text style={styles.graphBoxTitle}>Você possui {numberOfReviews} {numberOfReviews == 1 ? 'revisão pendente!' : 'revisões pendentes!'}</Text>
            {/* NESSE GRÁFICO INDICAR A QUANTIDADE DE REVISÕES POR DIA */}
            <Chart showLabel height={Dimensions.get("window").height * 0.3} elevation={2} data={dataChart} />
            <View style={styles.performanceBox}>
                <View style={styles.performanceButtonBox}>
                    <BorderlessButton onPress={handleClickGoToPerformanceScreen} style={styles.performanceButton}>
                        <Icon2 name="pie-chart" size={22} color="#FFF" />
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
                    {
                        premium 
                        ? 
                        <MenuButton color="#FFF" textColor="#303030" onPress={handleShowTipsModal} title="Dicas de Estudo">
                            <Icon name="bulb1" size={28} color="#303030" />
                        </MenuButton>
                        :
                        <MenuButton color="#FFF" textColor="#303030" onPress={/*handleOpenBePremium*/ handleGoToBePremiumScreen} title="Seja Premium">
                            <Icon2 name="trending-up" size={28} color="#303030" />
                        </MenuButton>
                    }
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#303030" onPress={handleClickGoToSettingScreen} title="Configurações">
                        <Icon2 name="settings" size={25} color="#303030" />
                    </MenuButton>
                </View>
            </View>
        </View>
        { handleOpenTutorialModal ? 
            <ScreenTutorial 
                steps={premium ? [Step0, Step1, Step2, Step3, Step6, Step5_P, Step7] : [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7]} 
                handleCloseModal={() => setHandleOpenTutorialModal(false)}
            /> :
            null
        }
        {
            handleOpenTipsModal && premium ? 
                <TipsModal
                    handleCloseModal={handleCloseTipsModal}
                    handelShowTips0={handelShowTips0}
                /> : null
        }
    </>

    return (
        <View style={styles.container}>
            {!isLoading ? homeDash : <Text>Carregando</Text>}
        </View>
    )
}

export default HomeScreen;