import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';


const UpdatesScreen = () => {

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    return (
        // Troca a tela de Atualizações pela de benefícios no app gratuito
        <View style={styles.container}>
            <View style={styles.updateBox}>
                <Text style={styles.updateText}>
                    Nosso aplicativo esta em constante desenvolvimento, dia após dia nossa equipe busca maneiras
                    de aperfeiçoar e melhorar o desempenho da aplicação e, consequentemente, a experiência de nossos usuários. Dessa forma, buscamos
                    formas de inovar e desenvolver novas funcionalidades para melhorar o desempenho dos seus estudos, aqui você pode visualizar algumas dessas
                    novidades que estão em desenvolvimento:
                </Text>
            </View>
            <View style={styles.updateItemBox}> 
                <View style={styles.updateItem}>
                    <Icon name="iconfontdesktop" size={25} color="#303030" style={{marginRight: 5}} />
                    <Text style={styles.updateItemText}>Versão WEB do aplicativo;</Text>
                </View>
                <View style={styles.updateItem}>
                    <Icon name="bulb1" size={25} color="#303030" style={{marginRight: 5}} />
                    <Text style={styles.updateItemText}>Mais dicas de estudo;</Text>
                </View>
                <View style={styles.updateItem}>
                    <Icon name="picture" size={25} color="#303030" style={{marginRight: 5}} />
                    <Text style={styles.updateItemText}>Imagens associadas às revisões;</Text>
                </View>
                <View style={styles.updateItem}>
                    <Icon2 name="library-music" size={25} color="#303030" style={{marginRight: 5}} />
                    <Text style={styles.updateItemText}>Arquivos de áudio da internet associados às revisões;</Text>
                </View>
            </View>
            <View style={styles.updateBox}>
                <Text style={styles.updateText}>
                    {''}Pretendemos melhorar muuuito o nosso App, portanto se você gostou e deseja que essas novidades cheguem o quanto antes,
                    considere, se possível, continuar contribuindo com o nosso aplicativo e tenha acesso a essas e todas as outras novidades que virão.
                    Você também pode nos ajudar avaliando nosso app na Google Play Store:
                </Text>
            </View>
            <View style={styles.feedbackBox}>
                <CustomButton text="AVALIE-NOS" color='#60c3eb' onPress={() => {}} />
            </View>
        </View>
    )
    
}

export default UpdatesScreen;