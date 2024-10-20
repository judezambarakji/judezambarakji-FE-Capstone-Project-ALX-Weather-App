export const getWindDirection = (deg: number): string => {
  if (deg > 15 && deg <= 75) return "North-East";
  if (deg > 76 && deg <= 105) return "East";
  if (deg > 105 && deg <= 165) return "South-East";
  if (deg > 166 && deg <= 195) return "South";
  if (deg > 195 && deg <= 255) return "South-West";
  if (deg > 255 && deg <= 285) return "West";
  if (deg > 285 && deg <= 345) return "North-West";
  if (deg > 345 || deg <= 15) return "North";
  return "North";
};

export const getHumidityValue = (level: number): string => {
  if (level <= 55) return "Dry and comfortable.";
  if (level > 55 && level <= 65) return "An uncomfortable sticky feeling.";
  if (level > 65) return "Uncomfortable moist air";
  return "Dry and comfortable.";
};
export const getVisibilityValue = (number: number): string => {
  if (number <= 50) return "Dangerously foggy";
  if (number > 50 && number <= 500) return "Expect heavy fog";
  if (number > 500 && number <= 2000) return "Expect some fog";
  if (number > 2000 && number <= 9000) return "Expect some haze";
  return "Very clear day";
};

export const getSunTime = (timepstamp: number): string => {
  const date = new Date(timepstamp * 1000);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  if (hours.length <= 1) hours = `0${hours}`;
  if (minutes.length <= 1) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};

export const getPrecipitation = (value: number): string => {
  if (value <= 0.33) return "No precipitation";
  if (value > 0.33 && value <= 0.66) return "Light precipitation";
  if (value > 0.66) return "Heavy precipitation";
  return "No precipitation";
};
