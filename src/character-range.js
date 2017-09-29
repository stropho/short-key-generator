/**
* Utility function to create a range/array of characters
* @param {string} firstChar first character of the desired range
*   - first character of the provided string is used
*   - non-strings are coverted to string
*   - if no character (empty string) is provided, empty array is returned
* @param {string} lastChar last character of the desired range; same behavior as firstChar
* @param {string} optStep default is one, decimals are floored, 0 converted to 1
* @return {Array.<string>} array of characters
*/
function characterRange(firstChar, lastChar, optStep) {
  // make sure `step` is a positive non-zero integer
  let step = Math.floor(Math.abs(+optStep)) || 1;
  let firstCode = `${firstChar}`.charCodeAt(0);
  let lastCode = `${lastChar}`.charCodeAt(0);
  let result = [];

  if (isNaN(firstCode) || isNaN(lastCode)) {
    return result;
  }

  if (firstCode > lastCode) {
    step *= -1;
  }

  for (let index = firstCode; step > 0 ? index <= lastCode : index >= lastCode; index += step) {
    result.push(String.fromCharCode(index))
  }

  return result;
}

export default characterRange;
