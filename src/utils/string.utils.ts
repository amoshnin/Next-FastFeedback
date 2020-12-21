export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const convertArrayToObject = (array, keyString, valueString) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[keyString]]: valueString ? item[valueString] : ''
    }
  }, {})
}
