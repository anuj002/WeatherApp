import { WEATHER_API_KEY } from "../api/ApiConstants";

export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  return await response.json();
};

