/**
 * @description: These are common methods of js
 * @author: shr
 * @date 2020-04-08
 */

/**
 * @feature 粗略比较两个对象中的值是否相等(无法比较NAN或undefined或value为对象的),暂时满足当前需求,如果需要深拷贝再比较的话,引入lodash
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */

export function isEqualObj (x, y) {
  // 指向同一内存
  if (x === y) {
    return true
  } else {
    const propsX = Object.getOwnPropertyNames(x)
    const propsY = Object.getOwnPropertyNames(y)
    if (propsX.length !== propsY.length) {
      return false
    }
    for (let i = 0, max = propsX.length; i < max; i++) {
      const propName = propsX[i]
      if (propName === '__ob__') continue // 不比较vue对象中的OB
      // 如果两个的值都为false则不用比较值(如: '' 与 null 比较 返回 true)
      if ((!!x[propName] || !!y[propName]) && x[propName] !== y[propName]) {
        return false
      }
    }
    return true
  }
}
