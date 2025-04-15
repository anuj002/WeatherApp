import React, { createContext, useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../services/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const getWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeatherByCity(cityName);
      setWeather(data);
      setCity(cityName);
      await AsyncStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError('City not found.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        loading,
        error,
        getWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
