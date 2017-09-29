/**
*
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
