import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Strings from './Strings';

export async function getNetInfo() {
    return NetInfo.fetch()
      .then(state => {
        return state.isConnected;
      })
      .catch(err => log('An error occurred==>', err));
}
  
export function showNoInternetDialog() {
    Alert.alert(
        Strings.NO_INTERNET,
        Strings.NO_INTERNET_MESSAGE,
        [{
            text: 'OK',
            onPress: () => {},
        },
    ],
        {cancelable: true},
    );
}