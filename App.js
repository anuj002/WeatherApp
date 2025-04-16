import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WeatherProvider} from './src/context/WeatherContext';
import HomeScreen from './src/screens/HomeScreen';
import {ThemeProvider} from './src/context/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <WeatherProvider>
            <HomeScreen />
          </WeatherProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {flex: 1},
});
