import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, Image, Dimensions, Linking } from 'react-native'
import CustomButton from '../../components/CustomButton';
import styles from './styles';
import Iaphub from 'react-native-iaphub';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/icons/logo.png';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BenefitsCard from '../../components/BenefitsCard';
import CustomModal from '../../components/CustomModal';
import api from '../../services/api';
import { getUniqueId } from 'react-native-device-info';


const BePremiumScreen = (props) => {

    const {setPremium, premium} = useContext(AuthContext)
    const [products, setProducts] = useState([{title: 'indisponível', priceAmount: '14.99'}])
    const [handleTermModal, setHandleTermModal] = useState(false)
    const navigation = useNavigation()

    // useEffect(() => {
    //   async function loadProducts() {
    //     var productsA = await Iaphub.getProductsForSale();
    //     alert[productsA[0].title]

    //     setProducts(productsA)
    //   }

    //   loadProducts()
    // }, [])

    async function handleBuyButton() {

      // var productsA = await Iaphub.getProductsForSale();
      // alert[productsA[0].sku]

      try {
          var transaction = await Iaphub.buy("android.ttr.premium", {
            crossPlatformConflict: false,
            // Optional property to override the default proration mode on Android (https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode)
            androidProrationMode: 1,
            // Optional callback triggered before the receipt is processed
            onReceiptProcess: (receipt) => {
              console.log('Purchase success, processing receipt...');
            }
          });
          /*
            * The purchase has been successful but we need to check that the webhook to our server was successful as well
            * If the webhook request failed, IAPHUB will send you an alert and retry again in 1 minute, 10 minutes, 1 hour and 24 hours.
            * You can retry the webhook directly from the dashboard as well
            */
          if (transaction.webhookStatus == "failed") {
            Alert.alert(
              "Compra em processamento",
              "Sua compra foi bem-sucedida, mas precisamos de mais algum tempo para validá-la, os recursos Premium serão liberados em breve (reinicie o app para verificar)! Caso contrário, entre em contato com o suporte (contato.almeidadev@gmail.com) "
            );
          }
          // Everything was successful! Yay!
          else {

            await api.post('/setPremiumStatus', {
              deviceId: getUniqueId()
            })

            Alert.alert(
              "Compra bem sucedida",
              "Sua compra foi realizada com sucesso! Muito obrigado, os recursos premium serão liberados em breve.",
              [
                  {
                    text: "Ok!",
                    onPress: () => {
                      setPremium(true)
                      navigation.navigate("PreLoadScreen")
                    },
                    style: "cancel"
                  }
              ],
                { cancelable: false }
            );
          }
        } catch (err) {
          // alert(err.code)
          // Couldn't buy product because it has been bought in the past but hasn't been consumed (restore needed)
          if (err.code == "product_already_owned") {
            Alert.alert(
              "Você já possui esse produto!",
              "Por favor, restaure a sua compra para tentar corrigir o problema",
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Ok, Restaurar!', onPress: async () => {
                  await Iaphub.restore().then((res) => {
                    navigation.navigate("PreLoadScreen")
                  })
                }}
              ]
            );
          }
          // The payment has been deferred (its final status is pending external action such as 'Ask to Buy')
          else if (err.code == "deferred_payment") {
            Alert.alert(
              "Compra aguardando confirmação",
              "Sua compra foi processada, mas está aguardando aprovação."
            );
          }
          /*
            * The receipt has been processed on IAPHUB but something went wrong
            * It is probably because of an issue with the configuration of your app or a call to the Itunes/GooglePlay API that failed
            * IAPHUB will send you an email notification when a receipt fails, by checking the receipt on the dashboard you'll find a detailed report of the error
            * After fixing the issue (if there's any), just click on the 'New report' button in order to process the receipt again
            * If it is an error contacting the Itunes/GooglePlay API, IAPHUB will retry to process the receipt automatically as well
            */
          else if (err.code == "receipt_validation_failed") {
            Alert.alert(
              "Estamos enfrentando problemas",
              "Estamos com alguns problemas na validação de sua compra, estamos trabalhando para corrigir isso!"
            );
          }
          /*
            * The receipt has been processed on IAPHUB but is invalid
            * It could be a fraud attempt, using apps such as Freedom or Lucky Patcher on an Android rooted device
            */
          else if (err.code == "receipt_invalid") {
            Alert.alert(
              "Comprovante inválido",
              "Não foi possível processar sua compra, se você foi cobrado, entre em contato com o suporte (contato.almeidadev@gmail.com)"
            );
          }
          /*
            * The receipt hasn't been validated on IAPHUB (Could be an issue like a network error...)
            * The user will have to restore its purchases in order to validate the transaction
            * An automatic restore should be triggered on every relaunch of your app since the transaction hasn't been 'finished'
            * Android should automatically refund transactions that are not 'finished' after 3 days
            */
          else if (err.code == "receipt_request_failed") {
            Alert.alert(
              "Problemas na validação da compra",
              "Houve um problema na validação da transação, tente reiniciar o aplicativo. Se o problema persistir, a Google Play irá reembolsar a compra após 3 dias úteis. Do contrário, entre em contato com nossa equipe.",
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Ok!', onPress: () => {
                  navigation.navigate("PreLoadScreen")
                }}
              ]
            );
          }
          /*
            * The user has already an active subscription on a different platform (android or ios)
            * This security has been implemented to prevent a user from ending up with two subscriptions of different platforms
            * You can disable the security by providing the 'crossPlatformConflict' parameter to the buy method (Iaphub.buy(sku, {crossPlatformConflict: false}))
            */
          // else if (err.code == "cross_platform_conflict") {
          //   Alert.alert(
          //     `Seems like you already have a subscription on ${err.params.platform}`,
          //     `You have to use the same platform to change your subscription or wait for your current subscription to expire`
          //   );
          // }
          // Couldn't buy product for many other reasons (the user shouldn't be charged)
          else {
            Alert.alert(
              "Erro na compra",
              "Não foi possível processar sua compra, tente novamente mais tarde."
            );
          }
        }
    }

    return (
      <View style={styles.container}>
              <View style={styles.logoBox}>
                  <Text style={styles.appTitle}>TimeToReview - Premium</Text>
                  <Image source={logo} style={{width: 250, height: 250}} />
                  {
                    premium ? 
                    <Text style={styles.appPrice}>Você já é Premium!</Text>
                    :
                    <>
                      <Text style={styles.appPriceLabel}>Por apenas:</Text>
                      <Text style={styles.appPrice}>R$ {products[0].priceAmount}</Text>
                    </>
                  }
              </View>
            {/* <Text style={{textAlign: 'center'}}>{products[0].title}, Preço:{products[0].priceAmount}, SKU: {products[0].sku}</Text> */}
            <ScrollView
              showsHorizontalScrollIndicator
              alwaysBounceHorizontal
              horizontal
              contentContainerStyle={[styles.scrollContainer]}
              // contentOffset={{x: 260, y: 0}}
              decelerationRate="normal"
            >
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Múltiplas Imagens</Text>
                <Icon name="switcher" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Anexe quantas imagens desejar nas suas revisões.</Text>
              </BenefitsCard>
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Sem Anúncios!</Text>
                <Icon3 name="airplay" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Remoção de todos os anúncios dentro do aplicativo.</Text>
              </BenefitsCard>
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Não há limites!</Text>
                <Icon2 name="infinite" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Crie sequências e disciplinas ilimitadamente.</Text>
              </BenefitsCard>
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Dicas de Estudo</Text>
                <Icon name="bulb1" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Dicas para você obter melhores resultados em seus estudos.</Text>
              </BenefitsCard>
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Atualizações!</Text>
                <Icon4 name="system-update-alt" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Você terá acesso a todas futuras funcionalidades excluisvas da versão Premium.</Text>
              </BenefitsCard>
            </ScrollView>
            <View style={styles.termLabelBox}>
              <Text onPress={async () => { setHandleTermModal(true) }} style={styles.termLabel}>Termos e condições</Text>
              {
                !premium &&
                <>
                  <Text style={[styles.termLabel, {textDecorationLine: 'none'}]}>|</Text>
                  <Text onPress={async () => {

                      await Iaphub.restore().then((res) => {
                        navigation.navigate("PreLoadScreen")
                      })

                  }} style={[styles.termLabel, {textDecorationLine: 'none'}]}>Restaurar</Text>
                </>
              }
            </View>
            <View style={{marginVertical: 10, width: '100%', alignSelf: 'center', alignItems: 'center'}}>
              {/* {!premium */}
              {!premium
                &&
                <CustomButton text="COMPRAR" color='#e74e36' onPress={handleBuyButton}/>
              }
            </View>
            {
                handleTermModal ? <CustomModal 
                    modalVisible={handleTermModal}
                    handleCloseModalButton={() => setHandleTermModal(false)}
                    modalCardHeight={400}
                    modalTitle="TERMOS E CONDIÇÕES"
                    doNotShowCheckButton
                >
                   <ScrollView contentContainerStyle={styles.termBox}>
                      <Text style={styles.termItemLabel}>1. A versão Premium é uma compra única. Uma vez desbloqueada, você pode usar todos os recursos da versão atual.</Text>
                      <Text style={styles.termItemLabel}>2. Devido a restrições na transferência de produtos virtuais entre plataformas, esta versão é válida apenas para dispositivos
                      Android compatíveis com a Google Play Store. Se quiser usar os recursos Premium em outros dispositivos, é precisao refazer a compra. Mas você pode usar a mesma conta
                      para sincronizar os dados após a compra.</Text>
                      <Text style={styles.termItemLabel}>3. A versão Premium é associada a sua conta da Google Play Store (ou seja, o seu aparelho Android), portanto se você tentar acessar a sua conta TimeToReview em outro dispositivo, que também tenha o aplicativo instalado, só
                      será possível acessar os recursos Premium caso a versão instalada no mesmo também seja a versão Premium.</Text>
                      <Text style={styles.termItemLabel}>4. O usuário pode restaurar a compra, recuperando, assim, os recursos da versão Premium. Para fazer isso, o usuário deve logar na Google Play Store com a MESMA conta na qual comprou o TimeToReview - Premium,
                      depois basta clicar no botão "Restaurar" que os recursos serão liberados.</Text>
                      <Text style={styles.termItemLabel}>5. Todo o processo de compra e pagamento é gerido pela Google Play. Sendo assim, se o seu pagamento não for aprovado, consulte a <Text onPress={() => Linking.openURL("https://support.google.com/googleplay/answer/1050566?hl=pt-BR")} style={{textDecorationLine: "underline", color: '#60c3eb'}}>Ajuda do Google Play </Text> 
                       e tente identificar o problema (Como desenvolvedores de aplicativos, não temos os direitos de processar questões relacionadas ao pagamento).</Text>
                      <Text style={styles.termItemLabel}>6. Com as atualizações do sistema Android, pode haver limitações nas novas funções que impedem o correto funcionamento das funções antigas.
                      Pedimos descuplas por qualquer transtorno, faremos o possível para corrigir os problemas.</Text>
                      <Text style={[styles.termItemLabel, {textAlign: 'center'}]}>Ao realizar a compra, você concorda com todos os termos e condições acima!</Text>
                   </ScrollView>
                </CustomModal> : null
            }
      </View>
    )
}

export default BePremiumScreen