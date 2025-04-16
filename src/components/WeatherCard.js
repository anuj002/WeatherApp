import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {WEATHER_IMAGE_URL} from '../api/ApiConstants';
import {Color} from '../theme/color';
import {Spacing} from '../theme/spacing';
import {FontSize} from '../theme/fonts';
import { Constants } from '../utils/constant';

const WeatherCard = ({data, bgImage}) => {
  const {darkMode} = useTheme();
  const {name, main, weather, wind} = data;
  const iconUrl = `${WEATHER_IMAGE_URL + weather[0].icon}@2x.png`;

  const styles = createStyles(darkMode);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={bgImage}
        style={styles.background}
        imageStyle={styles.imageStyle}
        >
        <View style={styles.cardHolder}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.city}>{name}</Text>
              <Icon
                name={Constants.LOCATION}
                size={16}
                color={darkMode ? Color.whiteColor : Color.shadowBlackColor}
              />
            </View>
            <Image source={{uri: iconUrl}} style={styles.icon} />
          </View>
          <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
          <Text style={styles.feelTemp}>
            Feel Like {Math.round(main.feels_like)}°C
          </Text>
          <Text style={styles.condition}>{weather[0].description}</Text>

          <View style={styles.row1}>
            <View style={styles.row}>
              <IconFeather
                name={Constants.WIND}
                size={16}
                color={darkMode ? Color.whiteColor : Color.shadowBlackColor}
              />
              <Text style={styles.wind}>{Math.round(wind.speed)} Km/h</Text>
            </View>
            <View style={styles.row}>
              <IconMaterial
                name={Constants.AIR_HUMIDIFIER}
                size={16}
                color={darkMode ? Color.whiteColor : Color.shadowBlackColor}
              />
              <Text style={styles.wind}>{Math.round(main.humidity)} %</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const createStyles = darkMode =>
  StyleSheet.create({
    background: {
      width: '100%',
      borderRadius: 10,
      resizeMode: 'cover',
    },
    imageStyle: {
      opacity: 0.5,
      borderRadius: 5,
      shadowColor: Color.shadowBlackColor,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 5,
    },
    card: {
      marginTop: Spacing[16],
    },
    cardHolder: {marginVertical: 16},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal:  Spacing[10],
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing[10],
    },
    icon: {width: 50, height: 50, alignSelf: 'flex-end'},
    city: {
      fontSize: FontSize[18],
      fontWeight: '500',
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
      marginRight:  Spacing[8],
    },
    temp: {
      fontSize: FontSize[54],
      fontWeight: 'bold',
      alignSelf: 'center',
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
    feelTemp: {
      fontSize: FontSize[14],
      alignSelf: 'center',
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
    condition: {
      fontSize: FontSize[20],
      fontWeight: '500',
      color: darkMode ? Color.lightGrayColor : Color.darkGrayColor,
      alignSelf: 'center',
      marginTop: Spacing[16],
    },
    wind: {
      fontSize: FontSize[14],
      marginLeft: Spacing[4],
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
  });

export default WeatherCard;
