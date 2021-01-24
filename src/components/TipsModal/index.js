import React, { useEffect, useState } from 'react'
import {View, Text, Image} from 'react-native'
import StepModal from "react-native-step-modal"
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign';
import postIt from '../../assets/images/tips/post-it.png'
import acronimo from '../../assets/images/tips/acronimo.png'
import metas from '../../assets/images/tips/metas.png'
import table from '../../assets/images/tips/table.png'
import mic from '../../assets/images/tips/mic.png'
import AsyncStorage from '@react-native-community/async-storage'

const TipsModal = (props) => {

    const [selectTip, setSelectTip] = useState(0)

    useEffect(() => {
        async function handleCheckTipsInfo() {
            console.log(props.handelShowTips0)
            if (!props.handelShowTips0) {
                let storageTipsInfo = Number(await AsyncStorage.getItem("@TTR:tipsInfo"))
    
                if (!storageTipsInfo) {
                    setSelectTip(1)
                    await AsyncStorage.setItem("@TTR:tipsInfo", "2")//always storage the next position
                } else {
                    if (storageTipsInfo < tipsArray.length) {
                        setSelectTip(storageTipsInfo)
                        await AsyncStorage.setItem("@TTR:tipsInfo", String(storageTipsInfo + 1))
                    } else {
                        setSelectTip(1)
                        await AsyncStorage.setItem("@TTR:tipsInfo", "2")
                    }
                }
            }
        }

        handleCheckTipsInfo()
    }, [])

    let Tips0 = <View style={styles.container}>
        <Icon name="bulb1" size={35} color="#303030" />
        <Text style={[styles.descriptionText, {fontWeight: 'bold', marginTop: 10}]}>
            Bem vindo{"(a)"} as dicas de estudo!
            {"\n"}
            {"\n"}
            Aqui você irá encontrar dicas variadas para aprimorar a sua qualidade e desempenho nos estudos de modo geral.
            {"\n"}
            {"\n"}
            O reportório de revisões é constantemente atualizado, portanto lembre-se de manter o aplicativo sempre na versão mais recente.
        </Text>
    </View>

    let Tips1 = <View style={styles.container}>
        <Text style={styles.tipTitle}>USE BLOCOS ADESIVOS!</Text>
        <Image 
            source={postIt}
            style={{width: 350, height: 220}}
        />
        <Text style={styles.descriptionText}>
            O uso de blocos adesivos (ou Post-it) pode ser muito útil
            quando deseja-se fazer pequenas anotações.
        </Text>
    </View>

    let Tips1_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Eles podem ser utilizados por você para lembrar de uma fórmula mátemática,
            um termo jurídico ou científico, uma regra gramatical, etc.
            {`\n`}
            {`\n`}
            Além disso, você pode espalhar vários pela casa com objetivo de serem utilizados
            como lembretes rápidos, que te ajudarão a recordar mesmo fora do horário de estudos.
        </Text>
    </View>

    let Tips2 = <View style={styles.container}>
        <Text style={styles.tipTitle}>CRIE ACRÓSTICOS!</Text>
        <Text style={styles.tipSubTitle}>Quem Matou Lampião: (Q=m.L)</Text>
        <Text style={styles.descriptionText}>
            Acrósticos são frases formadas por palavras cuja as letras são dicas para o que precisa ser lembrado.
        </Text>
    </View>

    let Tips2_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Realizar assimilações do tipo facilitam significativamente a memorização.
            {'\n'}
            {'\n'}
            Dessa forma, os acrósticos podem ser muito úteis, principalmente quando usados para lembrar fórmulas matemáticas.
        </Text>
    </View>

    let Tips2_2 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            É bem provável que durante o colegial você tenha aprendido algumas frases "macetes"
            ensinadas por professores, que também são acrósticos.
            {'\n'}
            {'\n'}
            Agora é hora de você criar seus próprios acrósticos!
        </Text>
    </View>

    let Tips3 = <View style={styles.container}>
        <Text style={styles.tipTitle}>CRIE ACRÔNIMOS!</Text>
        <Image
            source={acronimo}
            style={{width: 200, height: 200}}
        />
        <Text style={styles.descriptionText}>
            Acrônimos são palavras formadas com as letras ou sílabas iniciais de uma sequência de palavras, pronunciada sem soletração das letras que a compõem.
        </Text>
    </View>

    let Tips3_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Palavras pequenas são de mais fácil memorização do que grandes sentenças!
            {'\n'}
            {'\n'}
            Portanto, acrônimos podem te auxiliar bastante na hora recordar termos mais complexos, eles são
            comumente utilizados na ciência para abreviar nomes de doenças, substâncias, processos, etc.
        </Text>
    </View>

    let Tips4 = <View style={styles.container}>
        <Text style={styles.tipTitle}>DEFINA METAS!</Text>
        <Image
            source={metas}
            style={{width: 200, height: 200}}
        />
        <Text style={styles.descriptionText}>
            Estabeleça metas e objetivos diários bem definidos.
        </Text>
    </View>

    let Tips4_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Com base em sua rotina, estabeleça metas diárias, tais como número de revisões, horas de estudo, quantidade de exercícios, tempo de repouso, etc.
            {"\n"}
            {"\n"}
            Fazer isso irá ajudá-lo a manter seu desempenho diário nos estudos, servindo, também, como desafio para mantê-lo motivado.
        </Text>
    </View>

    let Tips4_2 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Sempre que sentir-se confortável, incremente as metas com objetivo de melhorar seu desempenho.
        </Text>
    </View>

    let Tips5 = <View style={styles.container}>
        <Text style={styles.tipTitle}>Contabilize Exercícios!</Text>
        <Image
            source={table}
            style={{width: 200, height: 200}}
        />
        <Text style={styles.descriptionText}>
            Registre a quantidade de exercícios feitos por dia, semana e mês.
        </Text>
    </View>

    let Tips5_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Contabilizar a quantidade de exercícios que você faz diariamente irá ajudá-lo a identificar seus pontos fortes e fracos e onde deve investir mais.
        </Text>
    </View>

    let Tips5_2 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Além disso, se você associar o tempo gasto por exercício, saberá quais matérias leva mais tempo para resolver exercícios e onde terá mais dificulade durante uma prova/teste.
            {'\n'}
            {'\n'}
            Dessa forma, você pode organizar e gerenciar melhor seu tempo durante uma avaliação.
        </Text>
    </View>

    let Tips6 = <View style={styles.container}>
        <Text style={styles.tipTitle}>Grave áudio-aulas!</Text>
        <Image
            source={mic}
            style={{width: 200, height: 200}}
        />
        <Text style={styles.descriptionText}>
            Ouvir gravações de um tema específico pode ser muito útil.
        </Text>
    </View>

    let Tips6_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Uma boa tática de memorização é fazer uma gravação de áudio acerca de um conteúdo e depois ouvi-la.
            {'\n'}
            {'\n'}
            Você pode utilizar seus resumos para gravar áudio-aulas e depois escutar durante a revisão do contéudo.
            {'\n'}
            {'\n'}
            Lembre-se que o nosso App permite associar arquivos de áudio às revisões.
        </Text>
    </View>

    let Tips6_2 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Além disso, o ato de gravar uma áudio-aula por si só ajuda muito na memorização e também demonstra qual seu nível de
            domínio sobre o contéudo.
            {'\n'}
            {'\n'}
            Uma das melhores formas de aprender é ensinando! Portanto, nada melhor do que ensinar a si mesmo.
        </Text>
    </View>

    let TipsEnd = <View style={styles.container}>
        <Text style={styles.tipTitle}>Mais dicas estão chegando...</Text>
        <Text style={styles.descriptionText}>
            Você esgotou as dicas por enquanto, mas não se preocupe estamos preparando muitas outras para você. 
            {"\n"}
            {"\n"}
            Mantenha o App sempre atualizado e tera acesso a novas dicas em breve.
            {"\n"}
            {"\n"}
            Você ainda pode rever as existentes sempre que desejar!
        </Text>
    </View>

    let tipsArray = [
        [Tips0], 
        [Tips5, Tips5_1, Tips5_2],
        [Tips1, Tips1_1], 
        [Tips2, Tips2_1, Tips2_2], 
        [Tips3, Tips3_1], 
        [Tips4, Tips4_1, Tips4_2],
        [Tips6, Tips6_1, Tips6_2],
        [TipsEnd]
    ]

    function handleChoiceTips() {
        return 1 + Math.floor(((tipsArray.length) - 1) * Math.random())
    }

    return (
        <StepModal 
            stepComponents={props.handelShowTips0 ? tipsArray[0] : tipsArray[selectTip]} 
            handleCloseModal={props.handleCloseModal}
        />
    )
}

export default TipsModal;