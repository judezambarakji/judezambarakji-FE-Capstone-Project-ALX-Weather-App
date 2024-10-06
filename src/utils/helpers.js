/**
 * Converts temperature from Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} - Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Converts wind speed from meters per second to kilometers per hour
 * @param {number} mps - Wind speed in meters per second
 * @returns {number} - Wind speed in kilometers per hour
 */
export const mpsToKmh = (mps) => {
  return mps * 3.6;
};

/**
 * Formats a Unix timestamp to a readable time string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - Formatted time string (e.g., "3:30 PM")
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Determines the gradient color for the precipitation card based on temperature and cloudiness
 * @param {number} temp - Temperature in Celsius
 * @param {number} cloudiness - Cloudiness percentage
 * @returns {string} - CSS gradient string
 */
export const getPrecipitationCardGradient = (temp, cloudiness) => {
  if (cloudiness > 50) {
    return "bg-gradient-to-br from-[#63939c] to-[#82a8b0]";
  } else if (temp >= 15) {
    return "bg-gradient-to-br from-[#f5540a] to-[#f7763b]";
  } else {
    return "bg-gradient-to-br from-[#5382ac] to-[#759bbd]";
  }
};

/**
 * Gets the icon color based on the precipitation card gradient
 * @param {string} gradient - CSS gradient string
 * @returns {string} - Hex color code
 */
export const getIconColor = (gradient) => {
  if (gradient.includes("#f5540a")) return "#f7763b";
  if (gradient.includes("#5382ac")) return "#759bbd";
  return "#82a8b0";
};

/**
 * Capitalizes the first letter of a string
 * @param {string} string - Input string
 * @returns {string} - String with first letter capitalized
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} - Average of the numbers
 */
export const calculateAverage = (numbers) => {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

/**
 * Converts visibility in meters to kilometers
 * @param {number} meters - Visibility in meters
 * @returns {string} - Visibility in kilometers with one decimal place
 */
export const metersToKilometers = (meters) => {
  return (meters / 1000).toFixed(1);
};

export default {
  celsiusToFahrenheit,
  mpsToKmh,
  formatTime,
  getPrecipitationCardGradient,
  getIconColor,
  capitalizeFirstLetter,
  calculateAverage,
  metersToKilometers,
};
