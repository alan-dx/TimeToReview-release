import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomModal from '../../components/CustomModal';
import DoubtContainer from '../../components/DoubtContainer';
import styles from './styles';

const DoubtsScreen = (props) => {

    const [ handleDoubtModal, setHandleDoubtModal ] = useState(false)
    const [ selectInfoData, setSelectInfoData ] = useState(0)
    const [ infoData ] = useState([
        {
            title: 'Onde as imagens/arquivos de aúdio são salvos?',
            info: 'A sua foto de perfil e os áudios/imagens associados à revisões que você adiciona no aplicativo são mantidos apenas na memória de seu dispositivo,'+
            ' tais arquivos não trafegam para nossos servidores.',
            key: '0',
            height: 150
        },
        {
            title: 'Como é realizado o cálculo da próxima revisão?',
            info: 'A data que uma determinada revisão ocorre é determinada pela sequência '+
            'associada a ela, de modo que cada dígito da sequência indica a quantidade de dias até a próxima revisão, '+
            'partindo da última data em que o assunto foi revisado. Por exemplo, uma revisão criada dia 20/10, associada à sequência 1-3-5, '+
            'seguirá a seguinte sequência de datas: 20/10 (criação) => 21/10 (1) => 24/10 (3) => 29/10 (5) => 04/11 (5). Observe que '+
            'quando o último número da sequênica do ciclo é alcançado todas as datas subsequentes são calculadas a partir dele.',
            key: '1',
            height: 260
        },
        {
            title: 'Haverá novas funcionalidades no App?',
            info: 'As novas funcionalidades do aplicativo já estão em desenvolvimento e em breve estarão disponíveis. Nossa equipe é pequena, mas esta trabalhando constantemente, '+
            'portanto pedimos sua compreensão e em breve seu aplicativo será atualizado.',
            key: '2',
            height: 160
        },
        {
            title: 'Quem gerencia as compras no App?',
            info: 'Todo o sistema de pagamentos, compras e assinaturas no aplicativo é gerido pela Google Play Store.',
            key: '3',
            height: 120
        },
        {
            title: 'Segurança da conta e privacidade',
            info: 'Segurança no mundo virtual é algo crucial nos tempos modernos, tendo em vista os dados que aqui trafegam. Pensando nisso, '+
            'evitamos solicitar dados sensíveis aos nossos usuários e buscamos manter a máxima transparência acerca de como seus dados serão utilizados e armazenados. '+
            'Você pode obter mais informações em nossa Política de Privacidade e Termos de Uso (Verifique a sessão "Política de privacidade" no menu de configurações).',
            key: '4',
            height: 220
        },
        {
            title: 'As revisões são salvas na nuvem?',
            info: 'Sim, suas revisões, disciplinas e sequências são armazenados em um servidor na nuvem. Dessa forma, você não precisa se preocupar com a possível perda '+
            'de seu material em situações como a troca de aparelho ou desinstalação do aplicativo. Para recuperar seus dados, basta acessar a sua conta da Google Play Store e '+
            'baixar essa versão do App novamente. Entretanto, áudios e imagens associados à revisões não podem ser recuperados, uma vez que esses dados não trafegam '+
            'para nossos servidores por uma questão de nossa Política de Privacidade.',
            key: '5',
            height: 260
        },
        {
            title: '"Aplicativo em Dark Mode"',
            info: 'Se você utiliza o Dark Mode (Tema escuro) em seu dispositivo o aplicativo também ira adequar as cores para se adaptar ao tema,'+
            ' entretanto, dependendo da versão de seu Android, a adaptação de cores pode não ser perfeita em algumas telas, porém, isso não interfere no uso da aplicação.',
            key: '6',
            height: 190
        },
        {
            title: 'Restaurar Premium',
            info: 'O usuário pode restaurar a compra, recuperando, assim, os recursos da versão Premium. Para fazer isso, o usuário deve logar na Google Play Store com a MESMA conta na qual comprou o TimeToReview - Premium, depois basta clicar no botão restaurar (na tela "Seja Premium") que os recursos serão liberados.',
            key: '7',
            height: 190
        }
    ])

    function handleCloseDoubtModal() {
        setHandleDoubtModal(false)
    }

    function handleOpenDoubt(key) {
        setHandleDoubtModal(true);
        setSelectInfoData(key)
    }

    return (
        <View style={styles.container}>
            {infoData != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={infoData}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => <DoubtContainer data={item} handleOpenDoubt={handleOpenDoubt} />}
                />
            }
            {
              handleDoubtModal ?  <CustomModal
                    modalVisible={handleDoubtModal}
                    handleCloseModalButton={handleCloseDoubtModal}
                    modalTitle="INFORMAÇÕES"
                    doNotShowCheckButton={true}
                    modalCardHeight={infoData[selectInfoData].height}
                >
                    <View style={styles.modalInfoBox}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.textMarker} />
                            <Text style={styles.modalInfoTitle}>{infoData[selectInfoData].title}</Text>
                        </View>
                        <View>
                            <Text style={styles.modalInfoText}>{infoData[selectInfoData].info}</Text>
                        </View>
                    </View>
                </CustomModal> : null
            }
        </View>
    )
}

export default DoubtsScreen;