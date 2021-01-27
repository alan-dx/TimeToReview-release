import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, PermissionsAndroid } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import AuthContext from '../../contexts/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/CustomModal';

const ProfileScreen = () => {

    const navigation = useNavigation()
    const { user, setUser, allReviews, subjects, routines, logoutContext } = useContext(AuthContext)
    const [filePath, setFilePath] = useState(null)
    const [handleOpenInputModal, setHandleOpenInputModal] = useState(false)
    const [inputNameModalValue, setInputNameModalValue] = useState(user.name)
    const [handleChoiceProfilePhotoModal, setHandleChoiceProfilePhotoModal] = useState(false)

    useEffect(()  => {
        async function loadStorageProfilePhoto() {
            let source = await AsyncStorage.getItem("@TTR:profilephoto")
            setFilePath(JSON.parse(source))
        }

        loadStorageProfilePhoto()
    }, [])

    async function handleChangeProfilePhoto(option) {

        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]).then((response) => {
            console.log(response)
            if((response["android.permission.CAMERA"] == 'denied') || (response["android.permission.WRITE_EXTERNAL_STORAGE"] == 'denied')) {
                alert('Precisamos dessas permissão para acessar sua câmera e salvar a foto na galeria. Por favor realize o processo novamente!')
            } else {
                if (option) {
                    launchCamera({
                        mediaType: 'photo',
                        saveToPhotos: true,
                        includeBase64: true
                    }, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled')
                        } else if (response.base64) {
                            setFilePath(response)
                            AsyncStorage.setItem("@TTR:profilephoto", JSON.stringify(response))
                            setHandleChoiceProfilePhotoModal(false)
                        }
                    })
                } else {
                    launchImageLibrary({
                        mediaType: 'photo',
                        includeBase64: true
                    }, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled')
                        } else if (response.base64) {
                            setFilePath(response)
                            AsyncStorage.setItem("@TTR:profilephoto", JSON.stringify(response))
                            setHandleChoiceProfilePhotoModal(false)
                        }
                    })
                }
            }
        }).catch((err) => {
            console.log(err)
        });


    }

    function handleCloseModal() {
        setHandleOpenInputModal(false)
    }

    async function handleCloseAndConfimModal() {

        await api.post('/changeUserName', {
            name: inputNameModalValue
        }).then((response) => {
            user.name = inputNameModalValue
            setUser(user)
            handleCloseModal()

            navigation.setParams({
                passData: inputNameModalValue
            })

        }).catch((err) => {
            handleCloseModal()
            alert('Ops! Algo de errado aconteceu, tente novamente!')
            console.log(err)
        })
    }

    function handleChangePass() {
        api.get('/verifyToken').then((response) => {
            navigation.navigate("VerifyPassScreen")
        }).catch((err) => {
            alert('Sessão expirada!')
            logoutContext()
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Olá, Bem Vindo(a)!</Text>
                <RectButton style={styles.profilePhotoBox} onPress={() => setHandleChoiceProfilePhotoModal(true)}>
                    { (filePath != null) ?
                        <Image source={{uri: 'data:image/jpeg;base64,' + filePath.base64}} style={{width: 150, height: 150, borderRadius: 100}} /> : 
                        <Icon name="camera" size={40} color="#303030" />
                    }
                </RectButton>
                <View>
                    <View style={styles.profileNameBox}>
                        <Text style={styles.profileName}>{user.name}</Text>
                        <BorderlessButton onPress={() => setHandleOpenInputModal(true)} style={styles.editButton}> 
                            <Icon name="edit" size={18} color="#60c3eb" />
                        </BorderlessButton>
                    </View>
                    <View style={styles.profileEmailBox}>
                        <Text style={styles.profileEmail}>{user.email}</Text>
                    </View>
                </View>
                <Text style={styles.infoText}>{allReviews.length} {allReviews.length == 1 ? 'revisão' : 'revisões'}, {routines.length} {routines.length == 1 ? 'rotina' : 'rotinas'} e {subjects.length} {subjects.length == 1 ? 'matéria cadastrada' : 'matérias cadastradas'}</Text>
            </View>
            <View style={styles.menuBox}>
                <RectButton style={styles.optionContainer}  onPress={handleChangePass}>
                    <Text style={styles.optionText}>Quero redefinir minha senha</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => logoutContext()}>
                    <Text style={styles.optionText}>Sair da conta</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
            </View>
            {
                handleOpenInputModal ?
                    <CustomModal
                        modalVisible={handleOpenInputModal}
                        handleConfirmModalButton={handleCloseAndConfimModal}
                        handleCloseModalButton={handleCloseModal}
                        modalCardHeight={200}
                        modalTitle="EDITAR NOME"
                    >
                        <View style={styles.modalNameBody}>
                            <Text style={styles.modalNameInputLabel}>Insira o seu Nome: </Text>
                            <TextInput
                                style={styles.modalNameInput}
                                keyboardType={"default"}
                                value={inputNameModalValue}
                                onChangeText={(text) => setInputNameModalValue(text)}
                                textAlign="center"
                            />
                        </View>
                    </CustomModal> : null
            }
            {
                handleChoiceProfilePhotoModal ? 
                    <CustomModal 
                        modalVisible={handleChoiceProfilePhotoModal}
                        handleCloseModalButton={() => setHandleChoiceProfilePhotoModal(false)}
                        modalCardHeight={200}
                        modalTitle="SELECIONE UMA OPÇÃO"
                        doNotShowCheckButton
                    >
                        <View style={styles.optionPictureBox}>
                            <TouchableHighlight underlayColor={"#FFFF"} onPress={() => handleChangeProfilePhoto(true)}>
                                <View style={styles.optionPicture}>
                                    <Icon name="camera" size={30} color="#303030" />
                                    <Text style={styles.optionPictureText}>Tirar foto</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={"#FFFFF"} onPress={() => handleChangeProfilePhoto(false)}>
                                <View style={styles.optionPicture}>
                                    <Icon name="grid" size={30} color="#303030" />
                                    <Text style={styles.optionPictureText}>Selecionar Foto da galeria</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </CustomModal> : null
            }
        </View>
    )
}

export default ProfileScreen;