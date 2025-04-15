import React, { useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from 'react-native';
import { WeatherContext } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import WeatherCard from '../components/WeatherCard';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const getBackgroundImage = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return require('../assets/backgrounds/clear.png');
    case 'clouds':
      return require('../assets/backgrounds/cloud.png');
    case 'rain':
      return require('../assets/backgrounds/rain.png');
    case 'snow':
      return require('../assets/backgrounds/snow.png');
    default:
      return require('../assets/backgrounds/defult.png');
  }
};

const HomeScreen = () => {
  const { city, setCity, getWeather, weather, loading, error } = useContext(WeatherContext);
  const { darkMode, toggleTheme } = useTheme();
  const styles = createStyles(darkMode);

  const condition = weather?.weather?.[0]?.main || '';
  const background = getBackgroundImage(condition);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.rowContainer}>
          <Text style={styles.appText}>Weather App</Text>
          <View style={styles.toggleContainer}>
            <Switch value={darkMode} onValueChange={toggleTheme} />
            <Text style={styles.label}>Dark Mode</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="search" size={20} color={darkMode ? '#fff' : '#000'} />
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder="Enter the name of city"
            placeholderTextColor={darkMode ? '#ccc' : '#888'}
          />
        </View>

        <Button title="Get Weather" onPress={() => getWeather(city)} />

        {loading && <ActivityIndicator style={styles.loading} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {weather && (
          <Animated.View entering={FadeInUp.duration(500)}>
            <WeatherCard data={weather} bgImage={background} />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const createStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 16,
      backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
    },
    rowContainer: {
      flexDirection: 'row',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appText: {
      fontSize: 18,
      fontWeight:'700',
      color: darkMode ? '#fff' : '#000',
    },
    toggleContainer: {
      alignItems: 'center',
    },
    label: {
      fontSize: 12,
      color: darkMode ? '#fff' : '#000',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 16,
      marginVertical: 10,
      borderColor: darkMode ? '#444' : '#ccc',
      backgroundColor: darkMode ? '#333' : '#fff',
    },
    input: {
      flex:1,
      fontSize: 16,
      marginLeft: 10,
      color: darkMode ? '#fff' : '#000',
    },
    loading: { marginTop: 10 },
    error: { color: 'red', marginTop: 50, alignSelf: 'center' },
  });

export default HomeScreen;
