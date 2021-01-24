import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './styles'

const InputWLabelR = (props) => {

    return (
        <View style={[styles.inputBox, {marginTop: props.marginTop}]}>
            <View style={styles.labelBoxR}>
                <Text style={styles.label}>{props.labelTitle}</Text>
                <View style={[styles.labelFrame, {backgroundColor: props.lineColor || '#60c3f1'}]} />
            </View>
            {/* <Input value={props.value} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText} textAlign="center" placeholder={props.placeholder} /> */}
            <TextInput
                style={[styles.input, {textAlign: props.textAlign}]}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType || "default"}
                placeholderTextColor="#ABABAB"
                onChangeText={props.onChangeText}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    )

}

export default InputWLabelR