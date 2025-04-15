import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherCard = ({ data, bgImage }) => {
  const { darkMode } = useTheme();
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const styles = createStyles(darkMode);

  return (
      <View style={styles.card}>
        <ImageBackground
          source={bgImage}
          style={styles.background}
          resizeMode="cover"
          imageStyle={styles.imageStyle}
          >
          <View style={styles.cardHolder}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.city}>{name}</Text>
                <Icon name="location" size={16} color={darkMode ? '#fff' : '#000'} />
              </View>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
            </View>
            <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
            <Text style={styles.feelTemp}>Feel Like {Math.round(main.feels_like)}°C</Text>
            <Text style={styles.condition}>{weather[0].description}</Text>

            <View style={styles.row1}>
              <View style={styles.row}>
                <IconFeather name="wind" size={16} color={darkMode ? '#fff' : '#000'} />
                <Text style={styles.wind}>{Math.round(wind.speed)} Km/h</Text>
              </View>
              <View style={styles.row}>
                <IconMaterial name="air-humidifier" size={16} color={darkMode ? '#fff' : '#000'} />
                <Text style={styles.wind}>{Math.round(main.humidity)} %</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
  );
};

const createStyles = (darkMode) =>
  StyleSheet.create({
    background: {
      width:'100%',
      borderRadius: 10,
    },
    imageStyle: {
      opacity: 0.5,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
    card: {
      marginTop: 16,
    },
    cardHolder: { marginVertical: 16 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    icon: { width: 50, height: 50, alignSelf: 'flex-end' },
    city: { fontSize: 18, fontWeight: '500', color: darkMode ? '#fff' : '#000', marginRight: 8 },
    temp: { fontSize: 55, fontWeight:'bold', alignSelf: 'center', color: darkMode ? '#fff' : '#000' },
    feelTemp: {fontSize: 14, alignSelf: 'center', color: darkMode ? '#fff' : '#000'},
    condition: { fontSize: 20, fontWeight: '500', color: darkMode ? '#ccc' : '#444', alignSelf: 'center', marginTop: 16 },
    wind: { fontSize: 14, marginLeft: 5, color: darkMode ? '#fff' : '#000' },
  });

export default WeatherCard;
