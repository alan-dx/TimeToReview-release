/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./src/services/trackplayer.js'));

//1 - edite o AndroidManifest
//2 - veja os arquivos de build e o gradle propreties para alterar aquela parada de uso de memória lá
//3 - copie as keystores