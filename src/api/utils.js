export const getCounter =  (num) => {
  num = +num
  if (num < 0) return
  if (num < 1e+4) {
    return num
  }
  if (num >= 1e+4 && num <= 1e+8) {
    return Math.floor(num/1e+4) + '万'
  } else {
    return Math.floor(num/1e+8) + '亿'
  }
}