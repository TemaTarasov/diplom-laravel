/**
 * @param  {string}  value
 * @param  {boolean} full
 * @return {string}
 */
export function trim(value, full = false) {
  return isEmpty(value)
    ? value.trim().split(' ').filter(x => !isEmpty(x)).join(full ? '' : ' ')
    : value;
}

/**
 * @param  {*} value
 * @return {boolean}
 */
export function isEmpty(value) {
  return value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && !value.length) ||
    (typeof value === 'object' && !Object.keys(value));
}

window.Tarasov = window.Tarasov || {};

window.Tarasov.trim = trim;
window.Tarasov.isEmpty = isEmpty;
