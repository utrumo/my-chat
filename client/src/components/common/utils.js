/* eslint-disable import/prefer-default-export */
const addZero = (num) => (num > 9 ? num.toString() : `0${num}`);

export const getTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
