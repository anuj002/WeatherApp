import React, {createContext, useState, useEffect, useCallback} from 'react';
import {fetchWeatherByCity} from '../api/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
import { Constants } from '../utils/constant';

export const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLastCity = async () => {
      const savedCity = await AsyncStorage.getItem('lastCity');
      if (savedCity) {
        setCity(savedCity);
        getWeather(savedCity);
      }
    };
    loadLastCity();
  }, []);

  const onSuccess = response => {
    if (response) {
      setWeather(response);
    }
  };

  const onFailure = errorr => {
    console.log('onFailure==>', errorr);
    setError(Constants.CITY_NOT_FOUND);
  };

  const getWeather = async cityName => {
    setLoading(true);
    setError('');
    try {
      fetchWeatherByCity(cityName, onSuccess, onFailure);
      setCity(cityName);
      await AsyncStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(Constants.CITY_NOT_FOUND);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of fetchWeatherByCity
  const debouncedFetchWeather = useCallback(debounce(getWeather, 500), []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        loading,
        error,
        getWeather: debouncedFetchWeather, // expose debounced version
      }}>
      {children}
    </WeatherContext.Provider>
  );
};
