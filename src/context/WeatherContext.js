import React, { createContext, useState, useEffect, useCallback } from 'react';
// import { fetchWeatherByCity } from '../services/weatherService';
import { fetchWeatherByCity } from '../api/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
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
    // console.log('onSuccess==>', response);
    if (response && response?.data) {
      setWeather(data);
    }
  };

  const onFailure = error => {
    console.log('onFailure==>', error);
    setError('City not found.');
  };

  const getWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      // const data = await fetchWeatherByCity(cityName);
      fetchWeatherByCity(cityName, onSuccess, onFailure);
      setCity(cityName);
      await AsyncStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError('City not found.');
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
