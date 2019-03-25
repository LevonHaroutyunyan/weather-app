const API_URL = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '38d00d8069e23f049aacf35fd7c56b4e'; // my personal key

/**
 * Get weather
 * @param {String} lat - latitude
 * @param {String} lon - longitude
 * @returns {Promise} - weather forecast
 */
export const get = (lat, lon) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}?lat=${lat}&lon=${lon}&units=metric&mode=json&appid=${API_KEY}`)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
};

/**
 * Get cities
 * @returns {Promise} - cities
 */
export const getCities = () => {
  return new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json')
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
};
