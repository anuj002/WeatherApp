import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { WeatherContext } from '../src/context/WeatherContext';
import { ThemeContext } from '../src/context/ThemeContext';

const mockWeatherData = {
  weather: [{ main: 'Clear' }],
  name: 'New York',
  main: {
    temp: 298.15,
    temp_min: 295.15,
    temp_max: 300.15,
  },
};

describe('HomeScreen', () => {
  const mockSetCity = jest.fn();
  const mockGetWeather = jest.fn();

  const renderScreen = ({
    city = 'New York',
    weather = null,
    loading = false,
    error = '',
    darkMode = false,
  } = {}) =>
    render(
      <WeatherContext.Provider
        value={{
          city,
          setCity: mockSetCity,
          getWeather: mockGetWeather,
          weather,
          loading,
          error,
        }}
      >
        <ThemeContext.Provider value={{ darkMode, toggleTheme: jest.fn() }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </WeatherContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button correctly', () => {
    const { getByPlaceholderText, getByText } = renderScreen();

    expect(getByPlaceholderText('Enter city name')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();
  });

  it('calls setCity on text input change', () => {
    const { getByPlaceholderText } = renderScreen();
    fireEvent.changeText(getByPlaceholderText('Enter city name'), 'London');

    expect(mockSetCity).toHaveBeenCalledWith('London');
  });

  it('calls getWeather on button press', () => {
    const { getByText } = renderScreen({ city: 'Paris' });
    fireEvent.press(getByText('Get Weather'));

    expect(mockGetWeather).toHaveBeenCalledWith('Paris');
  });

  it('shows loading indicator when loading is true', () => {
    const { getByTestId } = renderScreen({ loading: true });
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('shows error message when error exists', () => {
    const { getByText } = renderScreen({ error: 'City not found' });
    expect(getByText('City not found')).toBeTruthy();
  });

  it('renders WeatherCard when weather data is available', async () => {
    const { getByText } = renderScreen({ weather: mockWeatherData });

    // waitFor is used because of the Animated.View
    await waitFor(() => {
      expect(getByText('New York')).toBeTruthy(); // From WeatherCard content
    });
  });
});
