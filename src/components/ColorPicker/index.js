import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import ColorPalette from 'react-native-color-palette';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const ColorPicker = (props) => {

    return (
      <ColorPalette
        value={props.markerSubject}
        titleStyles={styles.title}
        paletteStyles={styles.container}
        scaleToWindow
        onChange={color => props.setMarkerSubject(color)}
        colors={['#4747d1','#cc0000', '#ff8000', '#8000ff', '#ffcc00', '#0099cc', '#303030', '#025CE2', '#cccc00', '#009933', '#0000e6', '#8600b3', '#006666', '#b35900', '#cc00ff', '#00ff99', '#801a00', '#ff00ff', '#66ccff', '#4d4d4d', '#ff5050', '#d4ff52', '#52ff52', '#ff9900']}
        title={"Paleta de cores:"}
        icon={
          <Icon name={'check'} size={20} color={'white'} />
        }
    />)
}

export default ColorPicker;