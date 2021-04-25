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

export const filterIndex = (list) => {
  for (let i in list) {
    // for in 循环输出的 i 是 string。
    i = +i
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      return i + 1
    }
  }
}

//处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;