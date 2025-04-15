const API_KEY = 'd063582a3f5da483f2dc083b3ff77f9e'; // 'YOUR_OPENWEATHERMAP_API_KEY';

export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  return await response.json();
};
