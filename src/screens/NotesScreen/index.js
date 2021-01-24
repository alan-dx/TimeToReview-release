import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton, TextInput } from 'react-native-gesture-handler'
import InputWLabelL from '../../components/InputWLabelL'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useEffect } from 'react/cjs/react.development'

const NotesScreen = (props) => {

    //Modificar o listener do hardware back button e add a função que deve
    //ser chamada por aq
    
    const navigation = useNavigation()

    const [ titleNote, setTitleNote ] = useState(props.route.params?.screenData.title || '')
    const [ alignText, setAlignText ] = useState(props.route.params?.screenData.align || 'left')
    const [ textNote, setTextNote ] = useState(props.route.params?.screenData.note || '')

    function handleChangeAlignText() {
        switch (alignText) {
            case 'right':
                setAlignText('left')
                break
            case 'left':
                setAlignText('center')
                break
            case 'center':
                setAlignText('justify')
                break
            case 'justify':
                setAlignText('right')
                break
        }

    }

    function handleAddDotsOnText() {
        setTextNote(`${textNote}\n\n\t${'\u2B24'} `)
    }
    
    function handleDeleteAndGoBack() {
        setTitleNote('')
        setAlignText('left')
        setTextNote('')
        navigation.goBack()
        props.route.params?.onGoBack({
            title: '',
            note: '',
            align: 'left'
        })
    }

    function handleSaveAndGoBack() {
        navigation.goBack()
        props.route.params?.onGoBack({
            title: titleNote,
            note: textNote,
            align: alignText
        })
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 15}}>
                <InputWLabelL
                    labelTitle="Título da anotação"
                    value={titleNote}
                    secureTextEntry={false}
                    onChangeText={setTitleNote}
                    placeholder="Ex.: Equações úteis"
                    textAlign="center"
                />
            </View>
            <View style={styles.inputBox}>
                {/* <Text>{'\u2B24'} asdasd</Text> */}
                <TextInput
                    style={styles.input}
                    multiline
                    textAlignVertical="top"
                    placeholder="Faça aqui sua anotação"
                    textAlign={alignText}
                    value={textNote}
                    onChangeText={setTextNote}
                >

                </TextInput>
            </View>
            <View style={styles.optionsBox}>
                <BorderlessButton onPress={handleDeleteAndGoBack}>
                    <Icon name="trash-2" size={25} color="#303030" style={styles.iconBack} />
                </BorderlessButton>
                <BorderlessButton onPress={handleAddDotsOnText}>
                    <Icon name="list" size={25} color="#303030" style={styles.iconBack} />
                </BorderlessButton>
                <BorderlessButton onPress={handleChangeAlignText}>
                    <Icon name={`align-${alignText}`} size={25} color="#303030" style={styles.iconBack} />
                </BorderlessButton>
                <BorderlessButton onPress={() => setTextNote('')}>
                    <Icon name="delete" size={25} color="#303030" style={styles.iconBack} />
                </BorderlessButton>
                <BorderlessButton onPress={handleSaveAndGoBack}>
                    <Icon name="save" size={25} color="#303030" style={styles.iconBack} />
                </BorderlessButton>
            </View>
        </View>
    )

}

export default NotesScreen