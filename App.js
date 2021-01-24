/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';

import AppStack from './src/routes/AppStack';
import { AuthProvider } from './src/contexts/auth';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const App: () => React$Node = () => {
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
