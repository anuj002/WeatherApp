import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';
import { ThemeContext } from '../src/context/ThemeContext';
import { WEATHER_IMAGE_URL } from '../src/api/ApiConstants';

const mockWeatherData = {
  name: 'London',
  main: {
    temp: 290.15,
    feels_like: 288.5,
    humidity: 75,
  },
  weather: [
    {
      description: 'light rain',
      icon: '10d',
      main: 'Rain',
    },
  ],
  wind: {
    speed: 3.5,
  },
};

const mockBgImage = { uri: 'mock-image-path' };

const renderComponent = (darkMode = false) =>
  render(
    <ThemeContext.Provider value={{ darkMode }}>
      <WeatherCard data={mockWeatherData} bgImage={mockBgImage} />
    </ThemeContext.Provider>
  );

describe('WeatherCard', () => {
  it('renders city name correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('London')).toBeTruthy();
  });

  it('renders temperature and feels like values', () => {
    const { getByText } = renderComponent();

    // Math.round(290.15) => 290
    expect(getByText('290°C')).toBeTruthy();
    expect(getByText('Feel Like 289°C')).toBeTruthy();
  });

  it('renders weather condition description', () => {
    const { getByText } = renderComponent();
    expect(getByText('light rain')).toBeTruthy();
  });

  it('renders wind speed and humidity', () => {
    const { getByText } = renderComponent();
    expect(getByText('4 Km/h')).toBeTruthy(); // Math.round(3.5) = 4
    expect(getByText('75 %')).toBeTruthy();
  });

  it('renders weather icon with correct URL', () => {
    const { getByTestId } = renderComponent();

    const iconUrl = `${WEATHER_IMAGE_URL}10d@2x.png`;

    const iconImage = getByTestId('weather-icon');
    expect(iconImage.props.source.uri).toBe(iconUrl);
  });
});
