import React, {useState, useEffect} from 'react';
import {View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export const DTPicker = (props) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || props.dateTimeReview;
    setShow(Platform.OS === 'ios');
    props.onChange(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.dateTimeIconsBox}>
      <BorderlessButton onPress={showDatepicker}>
          <Icon name="calendar" size={50} color="#303030" />
      </BorderlessButton>
      <BorderlessButton onPress={showTimepicker}>
          <Icon textAlign="center" name="clockcircleo" size={50} color="#303030"  />
      </BorderlessButton>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.dateTimeReview}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
