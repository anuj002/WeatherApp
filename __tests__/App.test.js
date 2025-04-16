import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import App from '../App';

// Optionally mock HomeScreen to isolate context/provider rendering
jest.mock('../src/screens/HomeScreen', () => {
  return () => <Text>Mocked HomeScreen</Text>;
});

// If you're using vector icons or gesture handler in tests, mock them:
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/Entypo', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
  };
});

describe('App component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Mocked HomeScreen')).toBeTruthy();
  });

  it('wraps components in SafeAreaView and Providers', () => {
    const { UNSAFE_getByType } = render(<App />);
    const safeArea = UNSAFE_getByType(require('react-native').SafeAreaView);
    expect(safeArea.props.style).toMatchObject({ flex: 1 });
  });
});
