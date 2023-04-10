import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';

function notifyMessage( msg) {

  ToastAndroid.show(msg, ToastAndroid.SHORT)


}

export default notifyMessage;