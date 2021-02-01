import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import ChartLine from '../../components/ChartLine';
import Icon from 'react-native-vector-icons/Feather';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';
import averageCalculate from '../../utils/averageCalculate';
import ChartOverall from '../../components/ChartOverall';
import ScreenTutorial from '../../components/ScreenTutorial';
import AsyncStorage from '@react-native-community/async-storage';

const PerformanceScreen = () => {

    const { allReviews, subjects, routines, performance, lastWeekPerformance } = useContext(AuthContext);
    const [mostUseSubject] = useState(findMostUse(subjects))
    const [mostUseRoutine] = useState(findMostUse(routines))
    const [dataReviewsChart] = useState(performance.map(({reviews}) => {
        return reviews
    }))
    const [lastWeekDataReviewsChart] = useState(lastWeekPerformance.map(({reviews}) => {
        return reviews
    }))
    const [averageReviews, setAverageReviews] = useState(Math.round(averageCalculate(dataReviewsChart)))
    const [dataChronometerChart, setDataChronometerChart] = useState([0,0,0,0,0,0,0])
    const [averageChronometer, setAverageChronometer] = useState(dataChronometerChart)
    const [bestPerformanceDay, setBestPerformanceDay] = useState(findBestPerformanceDay(dataReviewsChart))
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Icon name="pie-chart" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Esta é a tela de Desempenho.
            {"\n"}
            {"\n"}
            Aqui você tem acesso a informações gerais de sua performance em nosso aplicativo, tais como: número de revisões/dia,
            porcentagem por matéria, desempenho diário e muito mais.
            {"\n"}
            {"\n"}
            Tente tirar o máximo de proveito desses dados!
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={{flexDirection: 'row', width: 100, alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={[stylesSteps.performanceChartIcon, {backgroundColor: '#e74e36'}]}>
                <Text style={stylesSteps.performanceChartIconLabel}>5</Text>
            </View>
            <View style={[stylesSteps.performanceChartIcon, {backgroundColor: '#60c3eb'}]}>
                <Text style={stylesSteps.performanceChartIconLabel}>1.25</Text>
            </View>
        </View>
        <Text style={stylesSteps.desciptionText}>
            Você pode interagir com as informações gráficas na tela de desempenho para obter informações mais detalhadas, basta pressionar os indicadores dos gráficos.
            {"\n"}
            {"\n"}
            Tais informações serão resetadas todo início de semana (segunda-feira) ou após um período de sete dias ou mais sem utilizar o aplicativo.
        </Text>
    </View>

    useEffect(() => {
        console.log('dataReviewsChart', dataReviewsChart)
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimePerformanceScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimePerformanceScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    useEffect(() => { //select which data to use, performance or lastWeekPerformance for each chart

        let tempArray = []

        let decisionForTimeAverage;

        performance.forEach(({cycles}, index) => {
            let teste = 0;
            cycles.forEach(({chronometer}) => {
                teste = teste + ((chronometer.getMinutes() * 60) + chronometer.getSeconds())/60
                tempArray[index] = parseFloat(teste.toFixed(2))
            })
        })

        lastWeekDataReviewsChart.map(item => {
            if (item != 0) {//if true => lastWeek had use
                console.log('qnts vezes repetiu o lastweek map', averageCalculate(lastWeekDataReviewsChart))
                setAverageReviews(Math.round(averageCalculate(lastWeekDataReviewsChart)))
                
                decisionForTimeAverage = true

                setBestPerformanceDay(findBestPerformanceDay(lastWeekDataReviewsChart))
                
                return null
            }
        })

        if (decisionForTimeAverage) {
            console.log('tempo semana passada foi usado')
            let tempInfoAverage = []
            lastWeekPerformance.forEach(({cycles}, index) => {
                let teste = 0;
                cycles.forEach(({chronometer}) => {
                    teste = teste + ((chronometer.getMinutes() * 60) + chronometer.getSeconds())/60
                    tempInfoAverage[index] = parseFloat(teste.toFixed(2))
                })
            })
            setAverageChronometer(tempInfoAverage)
        } else {
            setAverageChronometer(tempArray)
        }

        setDataChronometerChart(tempArray)

    }, [])

    function findMostUse(item) {
        let temp = 0
        let indexReturn = 0

        item.map(({associatedReviews}, index) => {
            if (associatedReviews.length > temp) {
                temp = associatedReviews.length
                indexReturn = index
            }
        })

        return indexReturn
    }

    function findBestPerformanceDay(data) {
        console.log(data)
        let index = data.indexOf(data.reduce((a,b) => Math.max(a,b)))
        console.log(index)
        let day = ''
        switch (index) {
            case 0:
                day = 'Domingo'
                break;
            case 1:
                day = 'Segunda'
                break;
            case 2:
                day = 'Terça'
                break;
            case 3:
                day = 'Quarta'
                break;
            case 4:
                day = 'Quinta'
                break;
            case 5:
                day = 'Sexta'
                break;
            case 6:
                day = 'Sábado'
                break;
        }

        return day;
    }
    
    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled contentContainerStyle={styles.scrollContainer}>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>INFORMAÇÕES GERAIS</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={{alignItems: 'flex-start', width: '90%', paddingVertical: 10}}>
                        <Text style={styles.subText}>Dia de maior desempenho (em geral): {bestPerformanceDay} </Text>
                        <Text style={styles.subText}>Sequência mais utilizada: {routines[mostUseRoutine].label || 'Verificando...'} </Text>
                        <Text style={styles.subText}>Matéria de maior uso: {subjects[mostUseSubject].label}</Text>
                    </View>
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>DESEMPENHO DO DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Você concluiu {dataReviewsChart[new Date().getDay()]} {dataReviewsChart[new Date().getDay()] == 1 ? 'revisão' : 'revisões'} hoje! (Média = {averageReviews} {averageReviews == 1 ? 'revisão' : 'revisões'}) </Text>
                    <ChartOverall
                        data={{
                            reviewsAverage: averageReviews,
                            days: dataReviewsChart
                        }} 
                    />
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>REVISÕES/MATÉRIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>{allReviews.length} {allReviews.length == 1 ? 'revisão' : 'revisões'} cadastradas</Text>
                    <ChartPiee data={subjects} />
                </View>
                
                <View style={styles.performanceItemBox}>
                    {/* Melhorar o cálculo das médias */}
                    <Text style={styles.textBold}>REVISÕES/DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Média diária: {averageReviews} {averageReviews == 1 ? 'revisão' : 'revisões'}</Text>
                    <ChartLine data={performance} height={300} />{/* For some reason, pass dataReviewsChart here cause a error */}
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>MINUTOS REVISADOS/DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Média diária: {averageCalculate(averageChronometer)} {averageCalculate(averageChronometer) == 1 ? 'minuto' : 'minutos'}</Text>
                    <ChartBar data={dataChronometerChart} />
                </View>
            </ScrollView>
            {handleOpenTutorialModal ? 
                <ScreenTutorial 
                    handleCloseModal={() => setHandleOpenTutorialModal(false)}
                    steps={[Step0, Step1]}
                />
                : null
            }
        </View>
    )
    
}

export default PerformanceScreen;