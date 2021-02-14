import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, Image, Dimensions } from 'react-native'
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
import { ScrollView } from 'react-native-gesture-handler';
import BenefitsCard from '../../components/BenefitsCard';

const BePremiumScreen = (props) => {

    const {setPremium} = useContext(AuthContext)
    const [products, setProducts] = useState([{title: 'nao foi', priceAmount: '0.00'}])
    const navigation = useNavigation()

    // useEffect(() => {
    //     async function loadProducts() {
    //         var products = await Iaphub.getProductsForSale();
    //         alert[products[0].title]

    //         setProducts(products)
    //     }

    //     loadProducts()
    // }, [])

    async function handleBuyButton() {
        try {
            var transaction = await Iaphub.buy(products[0].sku, {
              // Optional property to override the default proration mode on Android (https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode)
              androidProrationMode: 1,
              // Optional callback triggered before the receipt is processed
              onReceiptProcess: (receipt) => {
                console.log('Purchase success, processing receipt...');
              }
            });
            console.log(transaction);

            /*
             * The purchase has been successful but we need to check that the webhook to our server was successful as well
             * If the webhook request failed, IAPHUB will send you an alert and retry again in 1 minute, 10 minutes, 1 hour and 24 hours.
             * You can retry the webhook directly from the dashboard as well
             */
            if (transaction.webhookStatus == "failed") {
              Alert.alert(
                "Purchase delayed",
                "Your purchase was successful but we need some more time to validate it, should arrive soon! Otherwise contact the support (contato.almeidadev@gmail.com)"
              );
            }
            // Everything was successful! Yay!
            else {
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
            // Couldn't buy product because it has been bought in the past but hasn't been consumed (restore needed)
            if (err.code == "product_already_owned") {
              Alert.alert(
                "Product already owned",
                "Please restore your purchases in order to fix that issue",
                [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Restore', onPress: () => Iaphub.restore()}
                ]
              );
            }
            // The payment has been deferred (its final status is pending external action such as 'Ask to Buy')
            else if (err.code == "deferred_payment") {
              Alert.alert(
                "Purchase awaiting approval",
                "Your purchase has been processed but is awaiting approval"
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
                "We're having trouble validating your transaction",
                "Give us some time, we'll retry to validate your transaction ASAP!"
              );
            }
            /*
             * The receipt has been processed on IAPHUB but is invalid
             * It could be a fraud attempt, using apps such as Freedom or Lucky Patcher on an Android rooted device
             */
            else if (err.code == "receipt_invalid") {
              Alert.alert(
                "Purchase error recepit",
                "We were not able to process your purchase, if you've been charged please contact the support (support@myapp.com)"
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
                "We're having trouble validating your transaction",
                "Please try to restore your purchases later (Button in the settings) or contact the support (support@myapp.com)"
              );
            }
            /*
             * The user has already an active subscription on a different platform (android or ios)
             * This security has been implemented to prevent a user from ending up with two subscriptions of different platforms
             * You can disable the security by providing the 'crossPlatformConflict' parameter to the buy method (Iaphub.buy(sku, {crossPlatformConflict: false}))
             */
            else if (err.code == "cross_platform_conflict") {
              Alert.alert(
                `Seems like you already have a subscription on ${err.params.platform}`,
                `You have to use the same platform to change your subscription or wait for your current subscription to expire`
              );
            }
            // Couldn't buy product for many other reasons (the user shouldn't be charged)
            else {
              Alert.alert(
                "Purchase error",
                "We were not able to process your purchase, please try again later or contact the support (support@myapp.com)"
              );
            }
          }
    }

    return (
        <View style={styles.container}>
              <View style={styles.logoBox}>
                  <Text style={styles.appTitle}>TimeToReview - Premium</Text>
                  <Image source={logo} style={{width: 250, height: 250}} />
                  <Text style={styles.appPriceLabel}>Por apenas:</Text>
                  <Text style={styles.appPrice}>R$ 14.99</Text>
              </View>
            {/* <Text style={{textAlign: 'center'}}>{products[0].title}, Preço:{products[0].priceAmount}, SKU: {products[0].sku}</Text> */}
            <ScrollView
              showsHorizontalScrollIndicator
              alwaysBounceHorizontal
              horizontal
              contentContainerStyle={[styles.scrollContainer, {paddingHorizontal: Dimensions.get("screen").width / 8}]}
              // contentOffset={{x: 260, y: 0}}
              decelerationRate="normal"
            >
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Sem Anúncios!</Text>
                <Icon3 name="airplay" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Remoção de todos os anúncios dentro do aplicativo.</Text>
              </BenefitsCard>
              <BenefitsCard>
                <Text style={styles.benefitTitleLabel}>Múltiplas Imagens</Text>
                <Icon name="switcher" size={70} color="#303030" />
                <Text style={styles.benefitLabel}>- Anexe quantas imagens desejar nas suas revisões.</Text>
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
            <View style={{marginVertical: 10, width: '100%', alignSelf: 'center', alignItems: 'center'}}>
                <CustomButton text="COMPRAR" color='#e74e36' onPress={handleBuyButton}/>
            </View>
        </View>
    )
}

export default BePremiumScreen