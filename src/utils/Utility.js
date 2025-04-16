import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Constants } from './constant';

export async function getNetInfo() {
  return NetInfo.fetch()
    .then(state => {
      return state.isConnected;
    })
    .catch(err => console.log('An error occurred ==>', err));
}

export function showNoInternetDialog() {
  Alert.alert(
    Constants.NO_INTERNET,
    Constants.NO_INTERNET_MESSAGE,
    [
      {
        text: Constants.OK,
        onPress: () => {},
      },
    ],
    {cancelable: true},
  );
}
