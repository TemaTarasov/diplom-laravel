/**
 * @param  {string} template
 * @param  {object} data
 * @return {HTML.Element}
 */
export const template = (template, data) => {
  const d = document.createElement('div');
  d.innerHTML = `<template>${template}</template>`;

  const result = d.children[0].cloneNode(true);

  for (const key in data) {
    result.innerHTML = result.innerHTML.replace(new RegExp(`%${key}%`, 'gmi'), data[key]);
  }

  return result.content.children[0];
};

/**
 * @param  {function} callback
 * @return void 0
 */
export const documentReady = callback => {
  window.addEventListener('DOMContentLoaded', callback.bind(document), true);
};

window.Tarasov = window.Tarasov || {};

window.Tarasov.template = template;
window.Tarasov.documentReady = documentReady;
