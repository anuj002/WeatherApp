import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';

test('renders city name and temperature', () => {
  const mockData = {
    name: 'London',
    main: { temp: 15 },
    weather: [{ main: 'overcast Cloudy', icon: '03d' }],
  };

  const { getByText } = render(<WeatherCard data={mockData} />);

  expect(getByText('London')).toBeTruthy();
  expect(getByText('15°C')).toBeTruthy();
  expect(getByText('Cloudy')).toBeTruthy();
});
