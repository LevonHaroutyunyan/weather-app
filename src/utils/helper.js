const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/**
 * Checks if two forcast items belong to same day
 * @param {Object} first - forecast list item
 * @param {Object} second - forecast list item
 * @return {Boolean} - belongs or not
 */
const belongsToSameDay = (first, second) => {
  if (!first) return false;

  return new Date(first.dt * 1000).getDate() === new Date(second.dt * 1000).getDate();
};

/**
 * Converts unix timestamp to readable format
 * @param {Number} timestamp - unix timestamp
 * @returns {String} - human readable time
 */
export const timeToDate = timestamp => {
  const date = new Date(timestamp * 1000);

  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  return `${weekDays[dayOfWeek]} ${dayOfMonth}`;
};

/**
 * Converts unix timestamp to hours
 * @param {Number} timestamp - unix timestamp
 * @returns {Number} - hours
 */
export const timeToHours = timestamp => {
  const date = new Date(timestamp * 1000);

  return date.getHours();
};

/**
 * Combines forecast by days
 * @param {Object} forecast - forecast for 5 days
 * @returns {Array} - combined forecast
 */
export const combineByDay = forecast => {
  const combinedData = [];
  let i = 0;

  combinedData.push([]);

  forecast && forecast.list && forecast.list.forEach(listItem => {
    if (combinedData[i].length && !belongsToSameDay(combinedData[i][combinedData[i].length - 1], listItem)) {
      combinedData.push([]);
      i++;
    }

    combinedData[i].push(listItem);
  });

  return combinedData;
};

/**
 * Filters data
 * @param {Array} data - data
 * @param {String} value - value
 * @returns {Array} - filtered data
 */
export const search = (data, value) => {
  return data && data.filter(item => item.name.search(value.toLowerCase()) >= 0);
};
