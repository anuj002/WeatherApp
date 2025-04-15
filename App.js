/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { WeatherProvider } from './src/context/WeatherContext';
import HomeScreen from './src/screens/HomeScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <WeatherProvider>
          <HomeScreen />
        </WeatherProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
