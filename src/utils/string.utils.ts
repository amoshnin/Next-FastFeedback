import dayjs from 'dayjs'
export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const convertArrayToObject = (array, keyString, valueString) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[keyString]]: valueString ? item[valueString] : '',
    }
  }, {})
}

export const dateFormat = (date: string) => {
  return dayjs(date).format('MMM MM, YYYY HH:mm')
}

export const sortByDate = (array: Array<any>, field: string) => {
  return array.sort((a, b) =>
    dayjs(a[field]).isAfter(dayjs(b[field])) ? -1 : 1
  )
}
