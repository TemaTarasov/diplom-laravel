/**
 * @param  {string}  value
 * @param  {boolean} full
 * @return {string}
 */
export const trim = (value, full = false) => {
  return value
    ? value.trim().split(' ').filter(x => x !== '').join(full ? '' : ' ')
    : value
};

/**
 * @param  {*} value
 * @return {boolean}
 */
export const isEmpty = value => {
  return (
    typeof value === 'undefined' || value === null
  ) || value === '';
};
