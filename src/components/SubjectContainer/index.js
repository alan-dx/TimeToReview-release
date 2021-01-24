import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const SubjectContainer = (props) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleSubject}>{props.data.label}</Text>
            </View>
            <Text style={styles.label}>{props.data.associatedReviews.length} {props.data.associatedReviews.length == 1 ? 'REVISÃO ASSOCIADA' : 'REVISÕES ASSOCIADAS'}</Text>
            <View style={styles.infoBox}>
                <View style={[styles.infoButtonBox, {backgroundColor: '#60c3eb'}]}>
                    <RectButton onPress={props.onPressEdit} style={styles.containerButton}>
                        <Text style={styles.textButton}>EDITAR</Text>
                    </RectButton>
                </View>
                <View style={[styles.infoButtonBox, {backgroundColor: '#e74e36'}]}>
                    <RectButton onPress={props.onPressDelete} style={styles.containerButton}>
                        <Text style={styles.textButton}>DELETAR</Text>
                    </RectButton>
                </View>
            </View>
            <View style={[styles.subjectColorMarker, {backgroundColor: props.data.marker}]} />
        </View>
    )
}

export default SubjectContainer;