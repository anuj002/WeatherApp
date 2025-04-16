import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from 'react-native';
import {WeatherContext} from '../context/WeatherContext';
import {useTheme} from '../context/ThemeContext';
import WeatherCard from '../components/WeatherCard';
import Animated, {FadeInUp} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../utils/constant';
import {FontSize} from '../theme/fonts';
import {Color} from '../theme/color';
import {ImageAssets} from '../theme/imageAssets';
import {Spacing} from '../theme/spacing';

const getBackgroundImage = condition => {
  switch (condition.toLowerCase()) {
    case Constants.CLEAR:
      return ImageAssets.clearWeather;
    case Constants.CLOUDS:
      return ImageAssets.cloudWeather;
    case Constants.RAIN:
      return ImageAssets.rainWeather;
    case Constants.SNOW:
      return ImageAssets.snowWeather;
    default:
      return ImageAssets.defaultWeather;
  }
};

const HomeScreen = () => {
  const {city, setCity, getWeather, weather, loading, error} =
    useContext(WeatherContext);
  const {darkMode, toggleTheme} = useTheme();
  const styles = createStyles(darkMode);

  const condition = weather?.weather?.[0]?.main || '';
  const background = getBackgroundImage(condition);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.rowContainer}>
          <Text style={styles.appText}>{Constants.APP_TITLE}</Text>
          <View style={styles.toggleContainer}>
            <Switch value={darkMode} onValueChange={toggleTheme} />
            <Text style={styles.label}>{Constants.DARK_MODE}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={Constants.SEARCH}
            size={20}
            color={darkMode ? Color.whiteColor : Color.shadowBlackColor}
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder={Constants.CITY_PLACEHOLDER}
            placeholderTextColor={
              darkMode ? Color.lightGrayColor : Color.grayColor
            }
          />
        </View>

        <Button
          title={Constants.GET_WEATHER}
          onPress={() => getWeather(city)}
        />

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

const createStyles = darkMode =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      paddingTop: Spacing[20],
      paddingHorizontal: Spacing[16],
      backgroundColor: darkMode
        ? Color.blackColors.blackOpacity50
        : Color.transparentWhiteBg,
    },
    rowContainer: {
      flexDirection: 'row',
      paddingVertical: Spacing[5],
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appText: {
      fontSize: FontSize[18],
      fontWeight: '700',
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
    toggleContainer: {
      alignItems: 'center',
    },
    label: {
      fontSize: FontSize[12],
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: Spacing[16],
      marginVertical: Spacing[10],
      borderColor: darkMode ? Color.darkGrayColor : Color.lightGrayColor,
      backgroundColor: darkMode ? Color.normalColor : Color.whiteColor,
    },
    input: {
      flex: 1,
      fontSize: FontSize[16],
      marginLeft: Spacing[10],
      color: darkMode ? Color.whiteColor : Color.shadowBlackColor,
    },
    loading: {marginTop: Spacing[10]},
    error: {color: Color.redColor, marginTop: Spacing[50], alignSelf: 'center'},
  });

export default HomeScreen;
