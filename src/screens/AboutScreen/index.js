import React from 'react';
import styles from './styles';
import {View, Text, Image, ScrollView} from 'react-native';
import logoImage from '../../assets/images/icons/logo.png';
import CurveChartLine from '../../components/CurveChartLine';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image source={logoImage} style={{width: 200, height: 200}} />
            </View>
            <ScrollView style={styles.aboutBox}>
                <View style={styles.aboutTextBox}>
                    <View style={styles.textMarker} />
                    <Text style={styles.aboutText}>
                        <Text style={{fontWeight: "bold"}}>O que é?</Text> TimeToReview é um aplicativo desenvolvido com o intuito de auxiliar e melhorar o desempenho
                            de seus usuários nos estudos. 
                    </Text>
                </View>
                <View style={styles.aboutTextBox}>
                    <View style={styles.textMarker} />
                    <Text style={styles.aboutText}>
                        <Text style={{fontWeight: "bold"}}>Como funciona?</Text> Basicamente, a ideia é gerenciar o conteúdo estudado
                        com base em ciclos de revisão. Dessa forma, o usuário mantém o conteúdo estudado sempre em dia,
                        diminuindo as chances de esquecê-lo, uma vez que o aplicativo indicara os assuntos que deverão ser revisados diariamente.
                    </Text>
                </View>
                <View style={styles.aboutTextBox}>
                    <View style={styles.textMarker} />
                    <Text style={styles.aboutText}>
                        <Text style={{fontWeight: "bold"}}>Fundamento: </Text> A motivação para desenvolver essa aplicação é baseada na 
                        <Text style={{fontWeight: 'bold'}}> Curva do Esquecimento</Text>, um conceito apresentado pelo psicólogo alemão 
                        <Text style={{fontWeight: 'bold'}}> Hermann Ebbinghaus</Text>, em 1885. Em resumo, a curva pressupõe o declínio da retenção de 
                        memória com o tempo, ou seja, nosso cérebro tem uma tendência natural a apagar nossas memórias, logo quanto mais o tempo passa, mais esquecemos o que foi visto ou lido por nós. {"\n"}
                        {"\t"} Entretanto, o estudo de Ebbinghaus relaciona-se com o conceito da <Text style={{fontWeight: 'bold'}}>força da memória</Text>, 
                        o qual se refere a durabilidade que a lembrança traça no cérebro com base no quão forte ela é. Ou seja, <Text style={{fontWeight: 'bold'}}>
                        quanto mais forte é a memória, menor são as chances dela ser esquecida.</Text>{"\n"}
                        {"\t"} Por exemplo, é muito fácil lembrar de um evento marcante, como o dia da sua aprovação no vestibular ou o
                        da sua formatura. Em contrapartida, é bem pouco provável que você lembre-se de como foi seu almoço a 7 dias atrás. {"\n"}
                        {"\n"}
                        <View >
                            <Text style={styles.titleChart}>Curva do Esquecimento - aproximação</Text>
                        </View>
                        <CurveChartLine />
                        O gráfico acima demonstra que a retenção do conteúdo estudado chega próximo de 30% nas primeiras 24 horas. Dessa forma, revisar o contéudo periodicamente é
                        extremamente importante, pois, assim, o seu cérebro passará a considerar o conteúdo como uma "memória forte", diminuindo significativamente as chances de 
                        esquecê-lo.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default AboutScreen;