/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param typeString 校验的属性
 * @param return  boolean
 */
export function checkArrayString(array, arrayType, typeString) {
  let index = -1;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const type = arrayType.split('.').length < 2 ? (arrayType && array[i][arrayType] == typeString) || (!arrayType && array[i] == typeString) : getMultistage(array[i], arrayType) == typeString
      if (type) {
        index = i;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return index;
}
export function checkArray(array) {
  return array && array.length > 0;
}

export function uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function getMultistage(data, index) {
  let temp = data;
  let path = index.split('.');
  if (path.length < 2) {
    return data[index]
  }
  for (let index = 0; index < path.length; index++) {
    if (temp[path[index]]) {
      temp = temp[path[index]]
    }
  }
  return temp
}