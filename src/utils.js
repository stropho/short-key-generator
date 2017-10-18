
function entriesToObject(entries, inverted = false) {
  let result = {};
  for (let [key, val] of entries) {
    if (inverted) {
      [key, val] = [val, key]
    }

    result[key] = val;
  }

  return result;
}

export {
  entriesToObject
};
