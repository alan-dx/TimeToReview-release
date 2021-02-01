/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import AppStack from './src/routes/AppStack';
import { AuthProvider } from './src/contexts/auth';

import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

const App: () => React$Node = () => {

  useEffect(() => {
      //admob setup
      admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
        console.log('suceess')
      });
      //admob setup

  }, [])

  return (
    <>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FCFCFC"/>
        <AppStack />
      </AuthProvider>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>TTR agora vai, fé em Deus</Text>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </SafeAreaView> */}
    </>
  );
};


export default App;
