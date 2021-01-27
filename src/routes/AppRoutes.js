import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import RoutineScreen from '../screens/RoutineScreen';
import SettingScreen from '../screens/SettingScreen';
import SubjectScreen from '../screens/SubjectScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';
import AddSubjectScreen from '../screens/AddSubjectScreen';
import EditSubjectScreen from '../screens/EditSubjectScreen';
import PreLoadScreen from '../screens/PreLoadScreen';
import AllReviewsScreen from '../screens/AllReviewsScreen';
import Header from '../components/Header';
import BePremiumScreen from '../screens/BePremiumScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import DoubtsScreen from '../screens/DoubtsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VerifyPassScreen from '../screens/VerifyPassScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import AboutScreen from '../screens/AboutScreen';
import NotesScreen from '../screens/NotesScreen';

const {Screen, Navigator} = createStackNavigator()

const AppRoutes = () => {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} mode= 'card'>
                <Screen 
                    name="PreLoadScreen" 
                    component={PreLoadScreen} 
                />
                <Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="MENU" showLogout color="#FCFCFC" />
                    }}
                />
                <Screen 
                    name="ReviewsScreen" 
                    component={ReviewsScreen}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        header: () => <Header route={route} navigation={navigation} title="REVISÕES" color="#FCFCFC" />
                      })}
                />
                <Screen 
                    name="RoutineScreen" 
                    component={RoutineScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="SEQUÊNCIAS" color="#FCFCFC" />
                    }} 
                />
                <Screen 
                    name="SubjectScreen" 
                    component={SubjectScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="DISCIPLINAS" color="#FCFCFC" />
                    }} 
                />
                <Screen 
                    name="PerformanceScreen" 
                    component={PerformanceScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="DESEMPENHO" color="#FCFCFC" />
                    }} 
                />
                <Screen 
                    name="SettingScreen" 
                    component={SettingScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="CONFIGURAÇÕES" color="#FCFCFC" />
                    }} 
                />
                <Screen 
                    name="DoubtsScreen" 
                    component={DoubtsScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="TIRA DÚVIDAS" color="#FCFCFC" />
                    }}
                />
                <Screen 
                    name="AboutScreen" 
                    component={AboutScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="SOBRE" color="#FCFCFC" />
                    }}
                />
                <Screen 
                    name="ProfileScreen" 
                    component={ProfileScreen}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        header: () => <Header route={route} navigation={navigation} title="SEU PERFIL" color="#FCFCFC" />
                    })}
                />
                <Screen 
                    name="VerifyPassScreen" 
                    component={VerifyPassScreen}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        header: () => <Header title="" color="#FCFCFC" />
                    })}
                />
                <Screen 
                    name="ChangePassScreen" 
                    component={ChangePassScreen}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        header: () => <Header title="" color="#FCFCFC" />
                    })}
                />
                <Screen 
                    name="BePremiumScreen" 
                    component={BePremiumScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="SEJA PREMIUM" color="#FCFCFC" />
                    }} 
                />
                <Screen 
                    name="AddScreen" 
                    component={AddScreen} 
                />
                <Screen 
                    name="NotesScreen"
                    component={NotesScreen}
                />
                <Screen 
                    name="EditScreen" 
                    component={EditScreen} 
                />
                <Screen 
                    name="AddSubjectScreen" 
                    component={AddSubjectScreen} 
                />
                <Screen 
                    name="EditSubjectScreen" 
                    component={EditSubjectScreen}
                />
                <Screen 
                    name="AllReviewsScreen" 
                    component={AllReviewsScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="TODAS REVISÕES" color="#FCFCFC" />
                    }} 
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;