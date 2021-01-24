import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import RoutineContainer from '../../components/RoutineContainer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import ScreenTutorial from '../../components/ScreenTutorial';
import AsyncStorage from '@react-native-community/async-storage';
import CustomModal from '../../components/CustomModal';
import { InterstitialAd, RewardedAd, AdEventType, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';

const RoutineScreen = (props) => {

    const {routines, setRoutines, logoutContext, allReviews} = useContext(AuthContext)

    useEffect(() => {
        console.log(routines)
    }, [])

    const [data, setData] = useState(routines)
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [sequenceRoutine, setSequenceRoutine] = useState('')
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [dataToEdit, setDataToEdit] = useState('')

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Icon name="sync" size={35} color="#303030" />
        <Text style={stylesSteps.desciptionText}>
            Esta é a tela de Sequências.
            {"\n"}
            {"\n"}
            Aqui é onde você poderá visualizar, criar ou editar as sequências existentes. 
            {"\n"}
            {"\n"}
            As sequências são utilizadas no cálculo das datas em que cada revisão ocorre.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Esse é o botão que você ira utilizar quando desejar criar novas sequências!
            {"\n"}
            {"\n"}
            Por padrão, já existe uma sequência de revisão criada automaticamente pelo App, essa sequência foi desenvolvida pela
            nossa equipe com base na curva de esquecimento (verifique a sessão "Sobre" no menu de configurações), entretanto você é livre para criar suas próprias sequências personalizadas.
        </Text>
    </View>
    let Step2 = <View style={stylesSteps.container}>
        <RoutineContainer 
            onPressEdit={() => {}} 
            onPressDelete={() => {}}
            data={
                {"associatedReviews": ["1", "2", "3", "4", "5"], "label": "0-1-3-7-14-21-30"}
            }
        />
        <Text style={stylesSteps.desciptionText}>
            Container de Sequência.
            {"\n"}
            {"\n"}
            É dessa forma que as sequências são visualizadas, interaga com o container para deletar ou editar uma sequência.
            {"\n"}
            {"\n"}
            Só será possível deletar uma sequência quando não houver revisões associadas a ela!
        </Text>
    </View>

    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeRoutineScreen")
            console.log(firstTimeOnScreen)
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeRoutineScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    function handleOpenAddModal() {
        if (routines.length < 3) {
            setSequenceRoutine('')
            setModalAddVisible(true)
        } else {
            Alert.alert(
                "Ops...",
                "Você só pode criar até três sequências de revisão na versão gratuita do TimeToReview. Caso deseje criar sequências ilimitadamente, adquira a versão Premium.",
                [
                  {
                    text: "Ok",
                    onPress: () => {},
                    style: "cancel"
                  },
                ],
                { cancelable: false }
              );
        }
    }

    function handleCloseAddModal() {
        setModalAddVisible(false)
        setSequenceRoutine('')
        setDataToEdit('')
    }

    function handleCloseModalAndAdd() {

        if (sequenceRoutine) {
            let sequenceFormated = sequenceRoutine
            if (sequenceRoutine[sequenceRoutine.length - 1] == '-') {
                sequenceFormated = sequenceRoutine.substr(0, sequenceRoutine.length - 1)
            }

            api.post('/createRoutine', {
                sequence: sequenceFormated
            }).then((response) => {
                console.log(response.data.routine)
                setData([...data, response.data.routine])
                setRoutines([...data, response.data.routine])
                setModalAddVisible(false)
                setSequenceRoutine('')
                setDataToEdit('')
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua sequência no banco de dados, tente novamente!')
                }
            })

        } else {
            setSequenceRoutine('')
            setDataToEdit('')
            alert('Preenhca o campo corretamente!')
        }

    }

    function handlePressDeleteRoutine(routine) {
        if (routine.associatedReviews.length == 0) {
            api.delete("/deleteRoutine", {
                params: {
                    id: routine._id
                }
            }).then((response) => {
                alert("Sequência deletada com sucesso!")
                const newData = data.filter(item => item._id != routine._id)
                setData(newData)
                setRoutines(newData)
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else if (err = 'Error: Request failed with status code 401') {
                    alert('Opa! Isso não deveria acontecer, entre em contato com o suporte relatando um erro do tipo NTO')
                } else {
                    alert('Houve um erro ao tentar salvar sua sequência no banco de dados, tente novamente!')
                }
            })
        } else {
            alert("Você não pode deletar esta sequência, pois ainda há revisões associadas a ela!")
        }
    }

    function handlePressEditRoutine(routine) {
        setModalEditVisible(true)
        setSequenceRoutine(routine.label)
        setDataToEdit(routine._id)
    }

    function handleCloseEditModal() {
        setModalEditVisible(false)
        setSequenceRoutine('')
        setDataToEdit('')
    }

    function handleCloseModalAndEdit() {

        if (sequenceRoutine) {
            let sequenceFormated = sequenceRoutine
            if (sequenceRoutine[sequenceRoutine.length - 1] == '-') {
                sequenceFormated = sequenceRoutine.substr(0, sequenceRoutine.length - 1)
            }

            api.put('/editRoutine', {
                sequence: sequenceFormated
            }, {
                params: {
                    id: dataToEdit
                }
            }).then((response) => {
    
                const newData = data
                setData([])
                const index = newData.findIndex(item => item._id == dataToEdit)
                newData[index] = response.data.routine
                setRoutines(newData)
                setData(newData)
    
                allReviews.map(item => {
                    //EDITA AS INFORMAÇÕES DENTRO DAS REVISÕES QUE ESTAO ASSOCIADAS A ESSA ROTINA
                    if (item.routine_id._id == dataToEdit) {
                        item.routine_id = response.data.routine
                    }
                } )
                // reviews.map(item => {
                //     if (item.routine_id._id == dataToEdit) {
                //         item.routine_id = response.data.routine
                //     }
                // })
    
                setModalEditVisible(false)
                setSequenceRoutine('')
                setDataToEdit('')
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua sequência no banco de dados, tente novamente!')
                }
            })
        } else {
            alert('SEQUÊNCIA NÃO EDITADA. Você não pode criar uma sequência vazia, preencha todos os campos corretamente!')
            setModalEditVisible(false)
            setSequenceRoutine('')
            setDataToEdit('')
        }
    }
    
    function handleOnInputChange(text) {
        //previousValue don't worked
        setSequenceRoutine(() => {

            if (text[text.length - 1] != ',' && text[text.length - 1] != '.' && text[text.length - 1] != ' ') {
                
                if (text[0] == '0' && ['0','1','2','3','4','5','6','7','8','9'].includes(text[1])) {//avoid 01-***
                    //Array.prototype.substr
                    if (text[text.length - 1] != '-') {
                        return text.substr(0, text.length - 1)+'-'//this delete the last word on string
                    } else {
                        return text
                    }
                } else if (text[text.length - 2] == '0' && ['0','1','2','3','4','5','6','7','8','9'].includes(text[text.length - 1])) {//avoid 12-01-**
                    return text.substr(0, text.length - 1)+'-'
                } else if (text[text.length - 2] == '-' && text[text.length - 1] == '-') {//avoid 1--****
                    console.log('a')
                    return text.substr(0, text.length - 1)
                } else {
                    return text
                }
                // if ((text > sequenceRoutine) && (sequenceRoutine.length > 0)) {
                //     //String.replace() doesn't worked when repeat a number
                //     let text2 = `${text.substr(0, text.length - 1)}-${text.substr(-1,1)}`
    
                //     return text2
                // } else if (text < sequenceRoutine) {
                    
                //     return text.substr(0, text.length - 1)//this delete the last word on string
                // } else {
                //     //used when sequenceRoutine.length == 0
                //     return text
                // }
            } else {
                return text.substr(0, text.length - 1)//this delete the last word on string
            }

        })
    }

    return (
        <>
            <View style={styles.container}>
                {data != null && 
                    <FlatList
                        style={styles.flatlist}
                        data={data}
                        keyExtractor={ item => item._id}
                        renderItem={({item}) => <RoutineContainer onPressEdit={() => handlePressEditRoutine(item)} onPressDelete={() => handlePressDeleteRoutine(item)} data={item} />}
                    />
                }
                {
                    modalAddVisible ?
                    <CustomModal
                        modalTitle="ADICIONAR SEQUÊNCIA"
                        modalVisible={modalAddVisible}
                        handleCloseModalButton={handleCloseAddModal} 
                        handleConfirmModalButton={handleCloseModalAndAdd}
                        modalCardHeight={390}
                    >
                        <TextInput
                            style={styles.modalRoutineInput}
                            keyboardType={"number-pad"}
                            value={sequenceRoutine}
                            onChangeText={handleOnInputChange}
                            textAlign="center"
                            placeholder="1-3-7-15-21-30"
                        />
                        <View style={styles.routineModalInfoBox}>
                            <Text style={styles.routineModalInfoText}>
                                Insira a sequência que deseja criar, digite os números e utilize o sinal <Text style={{fontWeight: 'bold'}}>-</Text> para separá-los. <Text style={{fontWeight: 'bold'}}>Exemplo: 1-3-7-14-21-30</Text>
                                {'\n'}
                                {'\n'}
                                Existe um sistema de autocorreção inputido para evitar que uma sequênica mal formatada seja criada.
                                {'\n'}
                                {'\n'}
                                Lembre-se, cada dígito indica após quantos dias, a partir da última revisão, a revisão associada será realizada, com excessão do primeiro dígito, já que
                                este indica a quantidade de de dias após a criação.
                                {'\n'}
                                {'\n'}
                                Caso deseje que uma revisão seja feita no mesmo dia de sua criação, insira <Text style={{fontWeight: 'bold'}}>0</Text> como primeiro dígito da sequência.
                            </Text>
                        </View>
                    </CustomModal> : null
                }
                {
                    modalEditVisible ?
                    <CustomModal
                        modalTitle="EDITAR SEQUÊNCIA"
                        modalVisible={modalEditVisible}
                        handleCloseModalButton={handleCloseEditModal} 
                        handleConfirmModalButton={handleCloseModalAndEdit}
                        modalCardHeight={390}
                    >
                        <TextInput
                            style={styles.modalRoutineInput}
                            keyboardType={"number-pad"}
                            value={sequenceRoutine}
                            onChangeText={handleOnInputChange}
                            textAlign="center"
                            placeholder="1-3-7-15-21-30"
                        />
                        <View style={styles.routineModalInfoBox}>
                        <Text style={styles.routineModalInfoText}>
                                Insira a sequência que deseja criar, digite os números e utilize o sinal <Text style={{fontWeight: 'bold'}}>-</Text> para separá-los. <Text style={{fontWeight: 'bold'}}>Exemplo: 1-3-7-14-21-30</Text>
                                {'\n'}
                                {'\n'}
                                Existe um sistema de autocorreção inputido para evitar que uma sequênica mal formatada seja criada.
                                {'\n'}
                                {'\n'}
                                Lembre-se, cada dígito indica após quantos dias, a partir da última revisão, a revisão associada será realizada, com excessão do primeiro dígito, já que
                                este indica a quantidade de de dias após a criação.
                                {'\n'}
                                {'\n'}
                                Caso deseje que uma revisão seja feita no mesmo dia de sua criação, insira <Text style={{fontWeight: 'bold'}}>0</Text> como primeiro dígito da sequência.
                            </Text>
                        </View>
                    </CustomModal> : null
                }
                <FloatAddButton onPress={handleOpenAddModal} />
                { handleOpenTutorialModal ? 
                <ScreenTutorial 
                    steps={[Step0, Step1, Step2]} 
                    handleCloseModal={() => setHandleOpenTutorialModal(false)}
                /> 
                    : null
                }
            </View>
        </>
    )
    
}

export default RoutineScreen;