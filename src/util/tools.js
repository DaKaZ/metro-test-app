/* eslint-disable import/prefer-default-export */
// this file is a collection of functions and should not have a default export

/*
 * computes the percentage of width of an element in 5% increments, starting at 5% and ending at
 * 100%
 * @param {Number} width
 * @return {Object} widthSizing
 */
function widthSizing(width) {
  const sizing = {};
  for (let i = 5; i <= 100; i += 5) {
    sizing[`${i}%`] = (width * (i / 100.0));
  }
  return sizing;
}

export {
  widthSizing
};
