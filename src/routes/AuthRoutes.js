import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DecisionScreen from '../screens/DecisionScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Header from '../components/Header';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false}} mode='card'>
                <Screen 
                    name="Decision" 
                    options={{headerShown: false}} 
                    component={DecisionScreen} 
                />
                <Screen 
                    name="SignIn" 
                    options={{headerShown: true, header: () => <Header title="LOGIN" color="#FCFCFC" />}} 
                    component={SignInScreen} 
                />
                <Screen 
                    name="SignUp" 
                    options={{headerShown: true, header: () => <Header title="CADASTRO" color="#FCFCFC" />}} 
                    component={SignUpScreen} 
                />
                <Screen 
                    name="ForgotPassword" 
                    options={{headerShown: true, header: () => <Header title="" color="#FCFCFC" />}} 
                    component={ForgotPasswordScreen} 
                />
                <Screen 
                    name="ResetPassword" 
                    options={{headerShown: true, header: () => <Header title="" color="#FCFCFC" />}} 
                    component={ResetPasswordScreen} 
                />
            </Navigator>
        </NavigationContainer>
    )
}

export default AuthRoutes;